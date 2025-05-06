import { Router } from 'express';
import { reminderRouter } from './v1_routes/reminder.route';

export const router = Router();

router.use('/v1/reminder', reminderRouter);
