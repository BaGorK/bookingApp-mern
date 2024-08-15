import express from 'express';
import myBookingsController from '../controllers/myBookingsController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, myBookingsController.getMyBookings);

// const bookingRouter = router;
export default router;
