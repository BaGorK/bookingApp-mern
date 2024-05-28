import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_LOCAL!);
    app.listen(PORT, () =>
      console.log(`DB connected and Server listening on port : ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
connectDb();
