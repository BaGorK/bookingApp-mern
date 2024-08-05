import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { verifyToken } from '../middlewares/authMiddleware';
import authController from '../controllers/authController';

const Router = express.Router();

Router.post(
  '/login',
  [
    check('email', 'email is required').isEmail(),
    check('password', 'password with 6 or more characters required').isLength({
      min: 6,
    }),
  ],
  authController.login
);

Router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ userId: req.userId });
});

Router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(Date.now()),
  });

  return res.status(200).json({ message: 'logout success' });
});

export default Router;
