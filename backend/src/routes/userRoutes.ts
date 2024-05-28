import express, { Request, Response } from 'express';
import User from '../models/userModel';
import { createJWT } from '../utils/tokenUtils';

const Router = express.Router();

// /api/users/register
Router.post('/register', async (req: Request, res: Response) => {
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
});

export default Router;
