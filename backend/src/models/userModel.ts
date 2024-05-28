import mongoose from 'mongoose';
import { hashPassword } from '../utils/passwordUtils';

export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { required: true, type: String },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }

  next();
});

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
