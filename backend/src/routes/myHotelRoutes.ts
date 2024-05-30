import express, { Request, Response } from "express";
import multer from "multer";

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/v1/myHotels
Router.post(
  "/",
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    return res.status(200).send("myHotels route");
  }
);

export default Router;
