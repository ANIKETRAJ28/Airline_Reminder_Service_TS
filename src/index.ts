import express, { Request, Response } from 'express';
import cors from 'cors';
import { corsOptions } from './util/cors.util';
import { PORT } from './config/env.config';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is alive' });
  return;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
