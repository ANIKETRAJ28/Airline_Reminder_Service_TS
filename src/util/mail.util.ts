import nodemailer from 'nodemailer';
import { EMAIL, PASS } from '../config/env.config';

export const mail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});
