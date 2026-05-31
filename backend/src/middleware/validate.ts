import type { NextFunction, Request, Response } from 'express';
import type { z } from 'zod';

export const validate = <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);
    next();
  };
