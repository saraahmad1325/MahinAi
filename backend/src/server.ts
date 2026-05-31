import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const start = async (): Promise<void> => {
  await connectDatabase();
  app.listen(env.port, () => {
    logger.info(`Mahin AI backend running on port ${env.port}`);
  });
};

start().catch((error) => {
  logger.error({ error }, 'Failed to start server');
  process.exit(1);
});
