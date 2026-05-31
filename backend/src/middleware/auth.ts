import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    req.user = verifyAccessToken(header.substring(7));
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (role: 'admin') => (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== role) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  next();
};
