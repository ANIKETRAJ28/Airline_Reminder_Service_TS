import { Request, Response } from 'express';
import { ReminderService } from '../service/reminder.service';

export class ReminderController {
  private reminderService: ReminderService;

  constructor() {
    this.reminderService = new ReminderService();
  }

  async createReminder(req: Request, res: Response): Promise<void> {
    try {
      const user_email = req.body.user_email;
      if (!user_email) {
        res.status(400).json({ message: 'Invalid reminder data' });
        return;
      }
      const reminder = await this.reminderService.createReminder({ user_email });
      res.status(201).json(reminder);
    } catch (error) {
      console.error('Error in ReminderController: createReminder', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getReminderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Invalid reminder ID' });
        return;
      }
      const reminder = await this.reminderService.getReminderById(id);
      if (!reminder) {
        res.status(404).json({ message: 'Reminder not found' });
        return;
      }
      res.status(200).json(reminder);
    } catch (error) {
      console.error('Error in ReminderController: getReminderById', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllReminders(_req: Request, res: Response): Promise<void> {
    try {
      const reminders = await this.reminderService.getAllReminders();
      res.status(200).json(reminders);
    } catch (error) {
      console.error('Error in ReminderController: getAllReminders', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getRemindersByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json({ message: 'Invalid email' });
        return;
      }
      const reminders = await this.reminderService.getRemindersByEmail(email);
      res.status(200).json(reminders);
    } catch (error) {
      console.error('Error in ReminderController: getRemindersByEmail', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getPendingReminders(_req: Request, res: Response): Promise<void> {
    try {
      const reminders = await this.reminderService.getPendingReminders();
      res.status(200).json(reminders);
    } catch (error) {
      console.error('Error in ReminderController: getPendingReminders', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteReminder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Invalid reminder ID' });
        return;
      }
      await this.reminderService.deleteReminder(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error in ReminderController: deleteReminder', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
