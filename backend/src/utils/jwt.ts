import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export interface JwtPayload {
  userId: string;
  role: 'user' | 'admin';
}

export const signAccessToken = (payload: JwtPayload): string =>
  jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessTtl as jwt.SignOptions['expiresIn'] });

export const signRefreshToken = (payload: JwtPayload): string =>
  jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshTtl as jwt.SignOptions['expiresIn'] });

export const verifyAccessToken = (token: string): JwtPayload =>
  jwt.verify(token, env.jwtAccessSecret) as JwtPayload;

export const verifyRefreshToken = (token: string): JwtPayload =>
  jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
