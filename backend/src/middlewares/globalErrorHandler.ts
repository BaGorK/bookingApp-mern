import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🔥 ERROR: ', err.stack);

  // Determine the appropriate HTTP status code based on the error
  const statusCode = err.statusCode || 500;

  // Prepare the error response
  res.status(statusCode).json({
    error: {
      message: err.message || 'An unexpected error occurred.',
      status: statusCode,
    },
  });
};