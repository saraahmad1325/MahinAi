import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'user' | 'admin';
  refreshTokenHash?: string;
  avatarUrl?: string;
  bio?: string;
  isEmailVerified: boolean;
  settings: {
    theme: 'light' | 'dark';
    emailNotifications: boolean;
  };
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    refreshTokenHash: String,
    avatarUrl: String,
    bio: String,
    isEmailVerified: { type: Boolean, default: false },
    settings: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      emailNotifications: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
