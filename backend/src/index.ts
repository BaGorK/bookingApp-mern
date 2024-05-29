import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes';
import authRouter from './routes/authRoutes';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

const PORT = process.env.PORT || 3000;

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_LOCAL as string);
    app.listen(PORT, () =>
      console.log(`DB connected and Server listening on port : ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectDb();
