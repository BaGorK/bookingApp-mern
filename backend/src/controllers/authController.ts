import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/userModel';
import { comparePassword } from '../utils/passwordUtils';
import { createJWT } from '../utils/tokenUtils';

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = createJWT({ userId: user._id });

    res.cookie('auth_token', token, {
      httpOnly: true,
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const authController = {
  login,
};

export default authController;
