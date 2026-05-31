import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Chat } from '../models/Chat.js';
import { generateAssistantReply } from '../services/ollamaService.js';
import { redis } from '../config/redis.js';

const messageSchema = z.object({
  chatId: z.string().optional(),
  prompt: z.string().min(1).max(5000)
});

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { chatId, prompt } = messageSchema.parse(req.body);
  const userId = req.user!.userId;
  const cacheKey = `chat:reply:${userId}:${prompt}`;
  const cached = await redis.get(cacheKey);

  let chat = chatId
    ? await Chat.findOne({ _id: new mongoose.Types.ObjectId(chatId), userId })
    : null;

  if (!chat) {
    chat = await Chat.create({
      userId,
      title: prompt.slice(0, 60),
      messages: []
    });
  }

  chat.messages.push({ role: 'user', content: prompt, createdAt: new Date() });

  const reply = cached ?? await generateAssistantReply(prompt, chat.messages.slice(-10).map((m) => `${m.role}: ${m.content}`));
  await redis.set(cacheKey, reply, 'EX', 600);

  chat.messages.push({ role: 'assistant', content: reply, createdAt: new Date() });
  await chat.save();

  res.json({ chatId: chat._id, reply, cached: Boolean(cached) });
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  const chats = await Chat.find({ userId: req.user!.userId }).sort({ updatedAt: -1 }).limit(50);
  res.json({ chats });
};
