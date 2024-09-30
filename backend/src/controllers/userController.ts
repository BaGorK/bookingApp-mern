import { Request, Response } from 'express';
import User from '../models/userModel';
import { createJWT } from '../utils/tokenUtils';
import { validationResult } from 'express-validator';
import { comparePassword } from '../utils/passwordUtils';

const setCookie = (res: Response, token: string) => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === 'production',
  });
};

const getMe = async (req: Request, res: Response) => {
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
};

const signup = async (req: Request, res: Response) => {
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
    setCookie(res, token);

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = createJWT({ userId: user._id });
    setCookie(res, token);

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const userController = { getMe, signup, login };

export default userController;
