import { Telegraf } from 'telegraf';
import config from '@bot/config';
import { initAgenda } from '@bot/helpers/agenda';

import { selectData } from '@bot/helpers/callback-data';

import { setupLoggerMiddleware } from '@bot/middlewares/setup-logger.middleware';
import { setupSessionMiddleware } from '@bot/middlewares/setup-session.middleware';
import { debugLoggerMiddleware } from '@bot/middlewares/debug-logger.middleware';
import { attachUserMiddleware } from '@bot/middlewares/attach-user.middleware';
import { analyticsMiddleware } from '@bot/middlewares/setup-analytics.middleware';
import { setLastActionToUserMiddleware } from '@bot/middlewares/last-action-to-user.middleware';

import { startCommandHandler } from '@bot/handlers/start-command.handler';
import { reviewsCommandHandler } from '@bot/handlers/reviews-command.handler';
import { matchesHandler } from '@bot/handlers/matches.handler';
import { statCommandHandler, statTournamentTabletHandler } from '@bot/handlers/statistics.handler';
import { timeCommandHandler, setTimeZoneHandler } from '@bot/handlers/timezone.handler';
import { sendChangelogCommandHandler } from '@bot/handlers/send-changelog-command.handler';
import { changelogCommandHandler } from '@bot/handlers/changelog.command';
import { statBotCommandHandler, statBotMenuSelectHandler } from '@bot/handlers/stat-bot.command';

const bot = new Telegraf(config.BOT_TOKEN, {
  telegram: {
    apiRoot: config.BOT_API_ROOT,
  },
});

initAgenda();

bot.use(setupLoggerMiddleware());
bot.use(setupSessionMiddleware());
bot.use(debugLoggerMiddleware());
bot.use(analyticsMiddleware);
bot.use(attachUserMiddleware);
bot.use(setLastActionToUserMiddleware);

bot.start(startCommandHandler);

bot.hears('Матчи', (ctx) => matchesHandler(ctx));
bot.action('update-matches', (ctx) => matchesHandler(ctx, true));

bot.hears('Статистика', (ctx) => statCommandHandler(ctx));
bot.action(selectData('select-tournament').filter(), (ctx) => statTournamentTabletHandler(ctx));

bot.command('time', timeCommandHandler);
bot.action(selectData('select-time').filter(), setTimeZoneHandler);

bot.command('sendChangeLog', (ctx) => sendChangelogCommandHandler(ctx));
bot.command('changelog', (ctx) => changelogCommandHandler(ctx));

bot.command('stat', (ctx) => statBotCommandHandler(ctx, 'now', false));
bot.action(selectData('select-stat-bot').filter(), statBotMenuSelectHandler);

bot.hears('Обзоры', (ctx) => reviewsCommandHandler(ctx));
bot.command('reviews', (ctx) => reviewsCommandHandler(ctx));
bot.action('update-reviews', (ctx) => reviewsCommandHandler(ctx, true));

bot.on('text', (ctx) => ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start'));

export default bot;
