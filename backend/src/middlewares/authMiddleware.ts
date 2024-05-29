import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../utils/tokenUtils';
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies['auth_token'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { userId } = verifyJWT(token) as JwtPayload;

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
