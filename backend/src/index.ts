import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

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
