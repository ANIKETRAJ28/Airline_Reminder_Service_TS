import cron from 'node-cron';
import { ReminderService } from '../service/reminder.service';
import { mail } from '../util/mail.util';

const reminderService = new ReminderService();

export const scheduleCron = (): void => {
  cron.schedule('*/1 * * * *', async () => {
    const pendingReminders = await reminderService.getPendingReminders();
    await Promise.all(
      pendingReminders.map(async (reminder) => {
        if (new Date(reminder.notification_time) <= new Date()) {
          await mail.sendMail({
            to: reminder.user_email,
            subject: reminder.subject,
            html: reminder.body,
          });
          await reminderService.updateReminder(reminder.id);
        }
      }),
    );
  });
};
