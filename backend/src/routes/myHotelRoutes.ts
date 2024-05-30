import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotelModel";
import { verifyToken } from "../middlewares/authMiddleware";

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
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1. upload image to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      // 2. if (upload) add the urls to the new hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // 3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // 4. return a 201 status
      return res
        .status(201)
        .json({ message: "hotel created success", data: hotel });
    } catch (error) {
      console.log("Error creating hotels: ", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export default Router;
