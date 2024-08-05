import express from 'express';
import multer from 'multer';
import { body } from 'express-validator';
import { verifyToken } from '../middlewares/authMiddleware';
import myHotelsController from '../controllers/myHotelsController';

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
  myHotelsController.createHotel
);

// fetch my hotels
// api/v1/myHotels
Router.get('/', verifyToken, myHotelsController.getMyHotels);
Router.get('/:id', verifyToken, myHotelsController.getHotel);
Router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  myHotelsController.updateHotel
);

export default Router;
