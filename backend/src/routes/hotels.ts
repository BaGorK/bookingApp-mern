import express from 'express';

import { param } from 'express-validator';
import { protect } from '../middlewares/authMiddleware';
import hotelsController from '../controllers/hotelsController';

const router = express.Router();

router.get('/search', hotelsController.search);

router.get('/', hotelsController.getAllHotels);

// /api/v1/hotels/345677654
router.get(
  '/:id',
  [param('id').notEmpty().withMessage('Hotel ID is required')],
  hotelsController.getHotel
);

// '/:hotelId/bookings/payment-intent',
router.post(
  '/:hotelId/bookings/payment-intent',
  protect,
  hotelsController.createPaymentIntent
);

// '/:hotelId/bookings',
router.post('/:hotelId/bookings', protect, hotelsController.getBookingsOnHotel);

export default router;
