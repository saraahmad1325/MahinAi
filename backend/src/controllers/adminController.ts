import type { Request, Response } from 'express';
import { Chat } from '../models/Chat.js';
import { User } from '../models/User.js';

export const getDashboard = async (_req: Request, res: Response): Promise<void> => {
  const [users, chats] = await Promise.all([User.countDocuments(), Chat.countDocuments()]);
  res.json({ stats: { users, chats } });
};

export const listUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await User.find().select('-passwordHash -refreshTokenHash').sort({ createdAt: -1 }).limit(100);
  res.json({ users });
};
