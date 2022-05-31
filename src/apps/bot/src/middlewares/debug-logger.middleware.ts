import updateLogger from 'telegraf-update-logger';
import { Context } from 'telegraf';

export const debugLoggerMiddleware =
  (options?: updateLogger.Options) => (ctx: Context, next: () => Promise<void>) => {
    ctx.logger.trace({
      msg: 'update received',
      update: ctx.update,
    });

    return updateLogger({
      log: (msg) =>
        ctx.logger.debug({
          msg,
        }),
      ...options,
    })(ctx, next);
  };
