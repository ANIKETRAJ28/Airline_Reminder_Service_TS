import amqp from 'amqplib/callback_api';
import { AIRLINE_MESSAGE_QUEUE_NAME, AIRLINE_MESSAGE_QUEUE_URL } from '../config/env.config';
import { ReminderService } from '../service/reminder.service';
import { IQueue } from '../interface/queue.interface';
import { mail } from '../util/mail.util';
import { ReminderBody } from '../util/reminderBody.util';
import { ReminderSubject } from '../util/reminderSubject.util';

const reminderService = new ReminderService();

export async function subscribeToQueue(): Promise<void> {
  try {
    // create a connection to RabbitMQ
    amqp.connect(AIRLINE_MESSAGE_QUEUE_URL, (error, connection) => {
      if (error) {
        console.error('Error connecting to RabbitMQ:', error);
        return;
      }
      // create a channel
      connection.createChannel((error1, channel) => {
        if (error1) {
          console.error('Error creating channel:', error1);
          return;
        }
        const queue = AIRLINE_MESSAGE_QUEUE_NAME;
        // assert an exchange with the same name and type "direct" and durable is set to true to ensure the queue survives a broker restart
        channel.assertExchange(queue, 'direct', { durable: true });
        // create a queue if it doesn't exist and durable is set to true to ensure the queue survives a broker restart
        channel.assertQueue(queue, { durable: true }, (error2, q) => {
          if (error2) {
            console.error('Error asserting queue:', error2);
            return;
          }
          // bind the queue to the exchange with the same name as the queue
          channel.bindQueue(q.queue, queue, queue);
          channel.consume(q.queue, (msg) => {
            if (msg?.content) {
              const payload: IQueue = JSON.parse(msg.content.toString());
              const body = ReminderBody(
                payload.reminder_data.flight_number,
                payload.reminder_data.from_city,
                payload.reminder_data.from_country,
                payload.reminder_data.to_city,
                payload.reminder_data.to_country,
                payload.reminder_data.from_airport_name,
                payload.reminder_data.from_airport_code,
                payload.reminder_data.to_airport_name,
                payload.reminder_data.to_airport_code,
                payload.reminder_data.departure_time,
                payload.reminder_data.arrival_time,
                payload.reminder_data.booking_id,
                payload.reminder_data.email,
                payload.reminder_data.seat_number,
                payload.reminder_data.seat_type,
              );
              const subject = ReminderSubject(
                payload.reminder_data.flight_number,
                payload.reminder_data.departure_time,
              );
              reminderService.createReminder({
                user_email: payload.reminder_data.email,
                subject,
                body,
                status: 'pending',
                notification_time: payload.notification_time,
              });
              mail.sendMail({
                to: payload.reminder_data.email,
                subject: payload.subject,
                html: payload.body,
              });
              channel.ack(msg); // acknowledge the message
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('Error publishing to RabbitMQ:', error);
  }
}
