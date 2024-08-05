import  { Request, Response } from 'express';
import cloudinary from 'cloudinary';

import Hotel from '../models/hotelModel';
import { HotelType } from '../shared/types';

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

const createHotel = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    // 1. upload image to cloudinary
    const imageUrls = await uploadImages(imageFiles);

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
};

const getMyHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json({ data: hotels });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
};

const getHotel = async (req: Request, res: Response) => {
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
};

const updateHotel = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;

    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const files = req.files as Express.Multer.File[];

    const updatedImageUrls = await uploadImages(files);
    hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

    await hotel.save();

    res.status(200).json({ message: 'Hotel updated', data: hotel });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const myHotelsController = { createHotel, getMyHotels, getHotel, updateHotel };

export default myHotelsController;
