import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import { errorHandler, notFound } from './middleware/error.js';
import mongoose from 'mongoose';
import { redis } from './config/redis.js';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.webClientUrl,
    credentials: true
  })
);
app.use(rateLimit({ windowMs: 60_000, limit: 60 }));
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/metrics', async (_req, res) => {
  let redisStatus: 'connected' | 'disconnected';
  try {
    await redis.connect();
    redisStatus = (await redis.ping()) === 'PONG' ? 'connected' : 'disconnected';
  } catch {
    redisStatus = 'disconnected';
  } finally {
    redis.disconnect();
  }

  res.json({
    memory: process.memoryUsage(),
    redis: redisStatus
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/files', fileRoutes);

app.use(notFound);
app.use(errorHandler);
