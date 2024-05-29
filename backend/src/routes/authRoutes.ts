import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/userModel';
import { comparePassword } from '../utils/passwordUtils';

const Router = express.Router();

Router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
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
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);
