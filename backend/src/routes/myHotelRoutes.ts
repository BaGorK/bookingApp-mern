import express, { Request, Response } from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import cloudinary from 'cloudinary';

import Hotel from '../models/hotelModel';
import { verifyToken } from '../middlewares/authMiddleware';
import { HotelType } from '../shared/types';

const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// create  hotels
// api/v1/myHotels
Router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('type').notEmpty().withMessage('type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage(
        'pricePerNight is required and  pricePerNight must be a number'
      ),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('facilities are required and facilities must be an array'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // 1. upload image to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
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
        .json({ message: 'hotel created success', data: hotel });
    } catch (error) {
      console.log('Error creating hotels: ', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

// fetch my hotels
// api/v1/myHotels
Router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json({ data: hotels });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

Router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.status(200).json({ status: 'success', data: hotel });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel' });
  }
});

Router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    try {
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

export default Router;
