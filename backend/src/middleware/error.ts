import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';

export const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Not found' });
};

export const errorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction): void => {
  void next;
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Validation failed', issues: err.issues });
    return;
  }

  logger.error({ err }, 'Unhandled error');
  res.status(500).json({ message: 'Internal server error' });
};
