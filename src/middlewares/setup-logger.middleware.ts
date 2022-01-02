import logger from '@bot/logger';
import { Logger } from 'pino';
import { Context } from 'telegraf';
import { randomUUID } from 'crypto';

declare module 'telegraf' {
  interface Context {
    logger: Logger;
  }
}

export const setupLoggerMiddleware = () => (ctx: Context, next) => {
  ctx.logger = logger.child({
    requestId: randomUUID(),
  });
  next();
};
