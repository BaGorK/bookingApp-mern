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
    res.status(200).json({ message: 'user login succuss' });
  }
);
