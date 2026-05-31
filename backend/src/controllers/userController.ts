import type { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User.js';

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional()
});

const updateSettingsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  emailNotifications: z.boolean().optional()
});

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user?.userId).select('-passwordHash -refreshTokenHash');
  res.json({ user });
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const payload = updateProfileSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(req.user?.userId, payload, { new: true }).select('-passwordHash -refreshTokenHash');
  res.json({ user });
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  const settings = updateSettingsSchema.parse(req.body);
  const user = await User.findByIdAndUpdate(req.user?.userId, { settings }, { new: true }).select('-passwordHash -refreshTokenHash');
  res.json({ user });
};
