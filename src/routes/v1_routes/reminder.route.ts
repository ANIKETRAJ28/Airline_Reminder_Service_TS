import { Router } from 'express';
import { ReminderController } from '../../controller/reminder.controller';

export const reminderRouter = Router();

const reminderController = new ReminderController();

reminderRouter.post('/', reminderController.createReminder.bind(reminderController));
reminderRouter.get('/', reminderController.getAllReminders.bind(reminderController));
reminderRouter.get('/id/:id', reminderController.getReminderById.bind(reminderController));
reminderRouter.get('/pending', reminderController.getPendingReminders.bind(reminderController));
reminderRouter.get('/email/:email', reminderController.getRemindersByEmail.bind(reminderController));
reminderRouter.delete('/:id', reminderController.deleteReminder.bind(reminderController));
