import { Telegraf } from 'telegraf';
import config from '~/apps/bot/src/config';
import { initAgenda } from '~/apps/bot/src/helpers/agenda';

import { selectData } from '~/apps/bot/src/helpers/callback-data';

import { setupLoggerMiddleware } from '~/apps/bot/src/middlewares/setup-logger.middleware';
import { setupSessionMiddleware } from '~/apps/bot/src/middlewares/setup-session.middleware';
import { debugLoggerMiddleware } from '~/apps/bot/src/middlewares/debug-logger.middleware';
import { attachUserMiddleware } from '~/apps/bot/src/middlewares/attach-user.middleware';
import { analyticsMiddleware } from '~/apps/bot/src/middlewares/setup-analytics.middleware';
import { setLastActionToUserMiddleware } from '~/apps/bot/src/middlewares/last-action-to-user.middleware';

import { startCommandHandler } from '~/apps/bot/src/handlers/start-command.handler';
import { reviewsCommandHandler, updateMatchesHandler } from '~/apps/bot/src/handlers/reviews-command.handler';
import { matchesHandler } from '~/apps/bot/src/handlers/matches.handler';
import { statCommandHandler, statTournamentTabletHandler } from '~/apps/bot/src/handlers/statistics.handler';
import { timeCommandHandler, setTimeZoneHandler } from '~/apps/bot/src/handlers/timezone.handler';
import { sendChangelogCommandHandler } from '~/apps/bot/src/handlers/send-changelog-command.handler';
import { changelogCommandHandler } from '~/apps/bot/src/handlers/changelog.command';
import { statBotCommandHandler, statBotMenuSelectHandler } from '~/apps/bot/src/handlers/stat-bot.command';

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
// bot.action(selectData('update-matches').filter(), (ctx) => matchesHandler(ctx, true));

bot.hears('Статистика', (ctx) => statCommandHandler(ctx));
// bot.action(selectData('select-tournament').filter(), (ctx) => statTournamentTabletHandler(ctx));

bot.command('time', timeCommandHandler);
bot.action(selectData('select-time').filter(), setTimeZoneHandler);

// bot.command('sendChangeLog', (ctx) => sendChangelogCommandHandler(ctx));
// bot.command('changelog', (ctx) => changelogCommandHandler(ctx));

// bot.command('stat', (ctx) => statBotCommandHandler(ctx, 'now', false));
// bot.action(selectData('select-stat-bot').filter(), statBotMenuSelectHandler);

// bot.hears('Обзоры', (ctx) => reviewsCommandHandler(ctx));
// bot.command('reviews', (ctx) => reviewsCommandHandler(ctx));
// bot.action('update-reviews', (ctx) => reviewsCommandHandler(ctx, true));
// bot.hears('updateMatchesToday', (ctx) => updateMatchesHandler(ctx, false));
// bot.hears('updateMatchesTomorrow', (ctx) => updateMatchesHandler(ctx, true));

bot.on('text', (ctx) => ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start'));

export default bot;
