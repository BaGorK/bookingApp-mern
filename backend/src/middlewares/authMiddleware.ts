import { NextFunction, Request, Response } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('verify token middleware');
  next();
};
