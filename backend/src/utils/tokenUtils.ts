import jwt from 'jsonwebtoken';
import { StringExpressionOperatorReturningBoolean } from 'mongoose';

export const createJWT = (payload: { userId: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  return decoded;
};
