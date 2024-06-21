import express, { Request, Response } from 'express';
import Hotel from '../models/hotelModel';
import { HotelSearchResponse } from '../shared/types';

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    );

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);

    const total = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (err) {
    console.log('error', err);
    res.status(500).json({ message: 'something went wrong' });
  }
});

export default router;
