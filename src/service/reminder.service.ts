import { IReminder, IReminderRequest } from '../interface/reminder.interface';
import { ReminderRepository } from '../repository/reminder.repository';

export class ReminderService {
  private reminderRepository: ReminderRepository;

  constructor() {
    this.reminderRepository = new ReminderRepository();
  }

  async createReminder(reminderData: IReminderRequest): Promise<IReminder> {
    try {
      const reminder = await this.reminderRepository.createReminder(reminderData);
      return reminder;
    } catch (error) {
      console.error('Error in ReminderService: createReminder', error);
      throw error;
    }
  }

  async getReminderById(id: string): Promise<IReminder> {
    try {
      const reminder = await this.reminderRepository.getReminderById(id);
      return reminder;
    } catch (error) {
      console.error('Error in ReminderService: getReminderById', error);
      throw error;
    }
  }

  async getAllReminders(): Promise<IReminder[]> {
    try {
      const reminders = await this.reminderRepository.getAllReminders();
      return reminders;
    } catch (error) {
      console.error('Error in ReminderService: getAllReminders', error);
      throw error;
    }
  }

  async getRemindersByEmail(email: string): Promise<IReminder[]> {
    try {
      const reminders = await this.reminderRepository.getRemindersByEmail(email);
      return reminders;
    } catch (error) {
      console.error('Error in ReminderService: getRemindersByEmail', error);
      throw error;
    }
  }

  async getPendingReminders(): Promise<IReminder[]> {
    try {
      const reminders = await this.reminderRepository.getPendingReminders();
      return reminders;
    } catch (error) {
      console.error('Error in ReminderService: getPrndingReminders', error);
      throw error;
    }
  }

  async deleteReminder(id: string): Promise<void> {
    try {
      await this.reminderRepository.deleteReminder(id);
    } catch (error) {
      console.error('Error in ReminderService: deleteReminder', error);
      throw error;
    }
  }
}
