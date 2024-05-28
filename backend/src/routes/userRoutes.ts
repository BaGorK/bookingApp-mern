import express, { Request, Response } from 'express';
import User from '../models/userModel';

const Router = express.Router();

Router.post('/register', async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) return res.status(400).json({ message: 'User already exists' });

    user = await User.create(req.body);

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

export default Router;
