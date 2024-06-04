import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import myHotelRouter from "./routes/myHotelRoutes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.json()); // is used for parsing application/json request bodies.
app.use(express.urlencoded({ extended: true })); //  is used for parsing x-www-form-urlencoded request bodies
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/myHotels", myHotelRouter);

app.get("*", (req: Request, res: Response) => {
  return res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "Route not found" });
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
