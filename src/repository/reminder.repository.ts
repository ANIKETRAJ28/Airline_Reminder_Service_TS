import { Pool, PoolClient } from 'pg';
import { IReminder, IReminderRequest } from '../interface/reminder.interface';
import { getPool } from '../util/dbPool.util';

export class ReminderRepository {
  private pool: Pool = getPool();

  async createReminder(data: IReminderRequest): Promise<IReminder> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        INSERT INTO reminder (user_email, subject, body, notification_time)
        VALUES ($1, $2, $3, $4)
        RETURNING *;  
      `;
      const values = [data.user_email, data.subject, data.body, data.notification_time];
      const result = await client.query(query, values);
      const reminder: IReminder = result.rows[0];
      return reminder;
    } catch (error) {
      console.log('Error in ReminderRepository: createReminder', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getReminderById(id: string): Promise<IReminder> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM reminder WHERE id = $1;
      `;
      const result = await client.query(query, [id]);
      const reminder: IReminder = result.rows[0];
      if (!reminder) {
        throw new Error('Reminder not found');
      }
      return reminder;
    } catch (error) {
      console.log('Error in ReminderRepository: getReminderById', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getAllReminders(): Promise<IReminder[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM reminder;
      `;
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log('Error in ReminderRepository: getAllReminders', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getRemindersByEmail(email: string): Promise<IReminder[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM reminder WHERE user_email = $1;
      `;
      const result = await client.query(query, [email]);
      return result.rows;
    } catch (error) {
      console.log('Error in ReminderRepository: getRemindersByEmail', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getPendingReminders(): Promise<IReminder[]> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        SELECT * FROM reminder WHERE status = 'pending';
      `;
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.log('Error in ReminderRepository: getPendingReminders', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async updateReminder(id: string): Promise<IReminder> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `UPDATE reminder SET status = 'sent' WHERE id = $1 RETURNING *`;
      const response = await client.query(query, [id]);
      const reminder: IReminder = response.rows[0];
      return reminder;
    } catch (error) {
      console.log('Error in ReminderRepository: updateReminder', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteReminder(id: string): Promise<void> {
    const client: PoolClient = await this.pool.connect();
    try {
      const query = `
        DELETE FROM reminder WHERE id = $1;
      `;
      await client.query(query, [id]);
    } catch (error) {
      console.log('Error in ReminderRepository: deleteReminder', error);
      throw error;
    } finally {
      client.release();
    }
  }
}
