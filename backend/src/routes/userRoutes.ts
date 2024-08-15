import express from 'express';
import { check } from 'express-validator';
import { protect } from '../middlewares/authMiddleware';
import userController from '../controllers/userController';

const Router = express.Router();

Router.get('/me', protect, userController.getMe);

// /api/users/register
Router.post(
  '/register',
  [
    check('firstName', 'First Name is required').isString(),
    check('lastName', 'last name is required').isString(),
    check('email', 'email is required').isEmail(),
    check('password', 'password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  userController.signup
);

export default Router;
