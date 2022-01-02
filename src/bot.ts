import { Telegraf } from 'telegraf';
import config from '@bot/config';

import { selectData } from '@bot/helpers/callback-data';

import { setupLoggerMiddleware } from '@bot/middlewares/setup-logger.middleware';
import { setupSessionMiddleware } from '@bot/middlewares/setup-session.middleware';
import { setupLocalizationsMiddleware } from '@bot/middlewares/setup-localizations.middleware';
import { debugLoggerMiddleware } from '@bot/middlewares/debug-logger.middleware';
import { attachUserMiddleware } from '@bot/middlewares/attach-user.middleware';
import { setLastActionToUserMiddleware } from '@bot/middlewares/last-action-to-user.middleware';

import { startCommandHandler } from '@bot/handlers/start-command.handler';
import { languageMenuSelectHandler, languageCommandHandler } from '@bot/handlers/language-selector.handler';

const { match } = require('telegraf-i18n');

const bot = new Telegraf(config.BOT_TOKEN, {
  telegram: {
    apiRoot: config.BOT_API_ROOT,
  },
});

bot.use(setupLoggerMiddleware());
bot.use(setupSessionMiddleware());
bot.use(setupLocalizationsMiddleware());
bot.use(debugLoggerMiddleware());
bot.use(attachUserMiddleware);
bot.use(setLastActionToUserMiddleware);

bot.start(startCommandHandler);

bot.command('language', languageCommandHandler);
bot.action(selectData('select-language').filter(), languageMenuSelectHandler);

bot.on('text', (ctx) => ctx.reply(ctx.i18n.t('messageError')));

export default bot;
