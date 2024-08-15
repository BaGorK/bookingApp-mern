import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import userController from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const Router = express.Router();

Router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  userController.login
);

Router.get('/validate-token', protect, (req: Request, res: Response) => {
  return res.status(200).json({ userId: req.userId });
});

Router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(Date.now()),
  });

  return res.status(200).json({ message: 'logout success' });
});

export default Router;
