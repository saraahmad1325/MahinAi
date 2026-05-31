import { resend } from '../config/resend.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const sendVerificationEmail = async (email: string, fullName: string): Promise<void> => {
  try {
    await resend.emails.send({
      from: env.resendFromEmail,
      to: email,
      subject: 'Welcome to Mahin AI',
      html: `<p>Hello ${fullName}, your account was created successfully.</p>`
    });
  } catch (error) {
    logger.warn({ error }, 'Failed to send email through Resend');
  }
};
