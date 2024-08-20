import express from 'express';
import { body } from 'express-validator';
import myHotelsController from '../controllers/myHotelsController';
import { protect } from '../middlewares/authMiddleware';
import upload from '../utils/multer';

const Router = express.Router();

// create  hotels
// api/v1/myHotels
Router.post(
  '/',
  protect,
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
Router.get('/', protect, myHotelsController.getMyHotels);
Router.get('/:id', protect, myHotelsController.getHotel);
Router.put(
  '/:hotelId',
  protect,
  upload.array('imageFiles'),
  myHotelsController.updateHotel
);

export default Router;
