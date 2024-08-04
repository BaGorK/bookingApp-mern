import express, { Request, Response } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import Hotel from '../models/hotelModel';
import { HotelType } from '../shared/types';

const router = express.Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => (booking.userId = req.userId)
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to fetch bookings' });
  }
});

// const bookingRouter = router;
export default router;
