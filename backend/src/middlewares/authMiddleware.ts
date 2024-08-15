import { type NextFunction, type Request, type Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';

import { verifyJWT } from '../utils/tokenUtils';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth_token: token } = req.cookies;

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
