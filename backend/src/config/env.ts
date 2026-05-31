import 'dotenv/config';

const required = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 8080),
  mongoUri: required('MONGO_URI', 'mongodb://localhost:27017/mahinai'),
  redisUrl: required('REDIS_URL', 'redis://localhost:6379'),
  jwtAccessSecret: required('JWT_ACCESS_SECRET', 'dev-access-secret-change-me'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-me'),
  jwtAccessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL ?? '7d',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
  ollamaModel: process.env.OLLAMA_MODEL ?? 'qwen2.5:3b',
  cloudinaryCloudName: required('CLOUDINARY_CLOUD_NAME', 'cloud-name'),
  cloudinaryApiKey: required('CLOUDINARY_API_KEY', 'api-key'),
  cloudinaryApiSecret: required('CLOUDINARY_API_SECRET', 'api-secret'),
  resendApiKey: required('RESEND_API_KEY', 'resend-api-key'),
  resendFromEmail: process.env.RESEND_FROM_EMAIL ?? 'no-reply@mahinai.app',
  webClientUrl: process.env.WEB_CLIENT_URL ?? 'http://localhost:5173'
};
