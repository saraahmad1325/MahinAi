import type { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User.js';
import { compareValue, hashValue } from '../utils/password.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { sendVerificationEmail } from '../services/emailService.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const register = async (req: Request, res: Response): Promise<void> => {
  const data = registerSchema.parse(req.body);
  const exists = await User.findOne({ email: data.email });
  if (exists) {
    res.status(409).json({ message: 'Email already in use' });
    return;
  }

  const user = await User.create({
    email: data.email,
    fullName: data.fullName,
    passwordHash: await hashValue(data.password)
  });

  await sendVerificationEmail(user.email, user.fullName);
  res.status(201).json({ message: 'Account created' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email });
  if (!user || !(await compareValue(data.password, user.passwordHash))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const payload = { userId: user._id.toString(), role: user.role } as const;
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  user.refreshTokenHash = await hashValue(refreshToken);
  await user.save();

  res.json({ accessToken, refreshToken, user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role } });
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const token = z.string().min(1).parse(req.body.refreshToken);
  const payload = verifyRefreshToken(token);
  const user = await User.findById(payload.userId);
  if (!user || !user.refreshTokenHash || !(await compareValue(token, user.refreshTokenHash))) {
    res.status(401).json({ message: 'Invalid refresh token' });
    return;
  }

  const accessToken = signAccessToken({ userId: user._id.toString(), role: user.role });
  res.json({ accessToken });
};
