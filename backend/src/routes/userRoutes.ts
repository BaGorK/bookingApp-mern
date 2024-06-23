import express, { Request, Response } from 'express';
import User from '../models/userModel';
import { createJWT } from '../utils/tokenUtils';
import { check, validationResult } from 'express-validator';
import { verifyToken } from '../middlewares/authMiddleware';

const Router = express.Router();

Router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) return res.status(400).json({ message: 'User already exists' });

      user = await User.create(req.body);

      const token = createJWT({ userId: user._id });

      res.cookie('auth_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      });

      return res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
);

export default Router;
