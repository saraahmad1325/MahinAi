import axios from 'axios';
import { env } from '../config/env.js';

export const generateAssistantReply = async (prompt: string, context: string[]): Promise<string> => {
  const fullPrompt = `${context.join('\n')}\nUser: ${prompt}\nAssistant:`.trim();

  const response = await axios.post(
    `${env.ollamaBaseUrl}/api/generate`,
    {
      model: env.ollamaModel,
      prompt: fullPrompt,
      stream: false
    },
    { timeout: 60_000 }
  );

  return response.data.response?.trim() || 'I could not generate a response right now.';
};
