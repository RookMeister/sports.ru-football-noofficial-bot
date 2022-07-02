import Logger from '@helpers/logger';
// import { Logger } from 'pino';
import { Context } from 'telegraf';
import { randomUUID } from 'crypto';

declare module 'telegraf' {
  interface Context {
    logger: typeof Logger;
  }
}

export const setupLoggerMiddleware = () => (ctx: Context, next: () => void) => {
  ctx.logger = Logger.child({
    requestId: randomUUID(),
  });
  next();
};
