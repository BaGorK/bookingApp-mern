import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import myBookingsController from '../controllers/myBookingsController';

const router = express.Router();

router.get('/', verifyToken, myBookingsController.getMyBookings);

// const bookingRouter = router;
export default router;
