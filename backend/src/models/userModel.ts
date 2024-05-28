import mongoose from 'mongoose';

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

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
