"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_1 = __importDefault(require("@bot/config"));
const agenda_1 = require("@bot/helpers/agenda");
const callback_data_1 = require("@bot/helpers/callback-data");
const setup_logger_middleware_1 = require("@bot/middlewares/setup-logger.middleware");
const setup_session_middleware_1 = require("@bot/middlewares/setup-session.middleware");
const debug_logger_middleware_1 = require("@bot/middlewares/debug-logger.middleware");
const attach_user_middleware_1 = require("@bot/middlewares/attach-user.middleware");
const last_action_to_user_middleware_1 = require("@bot/middlewares/last-action-to-user.middleware");
const start_command_handler_1 = require("@bot/handlers/start-command.handler");
const matches_handler_1 = require("@bot/handlers/matches.handler");
const timezone_handler_1 = require("@bot/handlers/timezone.handler");
const bot = new telegraf_1.Telegraf(config_1.default.BOT_TOKEN, {
    telegram: {
        apiRoot: config_1.default.BOT_API_ROOT,
    },
});
(0, agenda_1.initAgenda)();
bot.use((0, setup_logger_middleware_1.setupLoggerMiddleware)());
bot.use((0, setup_session_middleware_1.setupSessionMiddleware)());
bot.use((0, debug_logger_middleware_1.debugLoggerMiddleware)());
bot.use(attach_user_middleware_1.attachUserMiddleware);
bot.use(last_action_to_user_middleware_1.setLastActionToUserMiddleware);
bot.start(start_command_handler_1.startCommandHandler);
bot.hears('Матчи', (ctx) => (0, matches_handler_1.matchesHandler)(ctx));
bot.action('update-matches', (ctx) => (0, matches_handler_1.matchesHandler)(ctx, true));
bot.command('time', timezone_handler_1.timeCommandHandler);
bot.action((0, callback_data_1.selectData)('select-time').filter(), timezone_handler_1.setTimeZoneHandler);
bot.on('text', (ctx) => ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start'));
exports.default = bot;
//# sourceMappingURL=bot.js.map