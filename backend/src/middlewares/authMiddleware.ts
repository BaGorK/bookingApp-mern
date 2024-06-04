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

/**
 * Middleware function to verify the authenticity of a JSON Web Token (JWT).
 * If the token is valid, it extracts the user ID from the token payload and attaches it to the request object.
 * If the token is invalid or missing, it returns a 401 Unauthorized response.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A 401 Unauthorized response if the token is missing or invalid, otherwise calls the next middleware function.
 */
export const verifyToken = (
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
