import { IReminderStatus } from '../types/index.types';

export interface IReminderRequest {
  user_email: string;
}

export interface IReminder extends IReminderRequest {
  id: string;
  subject: string;
  body: string;
  status: IReminderStatus;
  notification_time: Date;
  created_at: Date;
  updated_at: Date;
}
