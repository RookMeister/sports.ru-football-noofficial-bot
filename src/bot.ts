import { Telegraf } from 'telegraf';
import config from '@bot/config';
import { initAgenda } from '@bot/helpers/agenda';

// import { selectData } from '@bot/helpers/callback-data';

import { setupLoggerMiddleware } from '@bot/middlewares/setup-logger.middleware';
import { setupSessionMiddleware } from '@bot/middlewares/setup-session.middleware';
import { debugLoggerMiddleware } from '@bot/middlewares/debug-logger.middleware';
import { attachUserMiddleware } from '@bot/middlewares/attach-user.middleware';
import { setLastActionToUserMiddleware } from '@bot/middlewares/last-action-to-user.middleware';

import { startCommandHandler } from '@bot/handlers/start-command.handler';
import { matchesHandler } from '@bot/handlers/matches.handler';

const bot = new Telegraf(config.BOT_TOKEN, {
  telegram: {
    apiRoot: config.BOT_API_ROOT,
  },
});

initAgenda();

bot.use(setupLoggerMiddleware());
bot.use(setupSessionMiddleware());
bot.use(debugLoggerMiddleware());
bot.use(attachUserMiddleware);
bot.use(setLastActionToUserMiddleware);

bot.start(startCommandHandler);

bot.hears('Матчи', (ctx) => matchesHandler(ctx));
bot.action('update-matches', (ctx) => matchesHandler(ctx, true));

bot.on('text', (ctx) => ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start'));

export default bot;
