"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("@bot/config"));
const logger_1 = __importDefault(require("@bot/logger"));
const bot_1 = __importDefault(require("@bot/bot"));
process.once("SIGINT", () => bot_1.default.stop("SIGINT"));
process.once("SIGTERM", () => bot_1.default.stop("SIGTERM"));
process.on("uncaughtException", (error) => logger_1.default.error(error));
function main() {
    mongoose_1.default.connect(process.env.MONGO);
    mongoose_1.default.connection.on('error', err => {
        logger_1.default.error(undefined, `mongo connection error`, err);
        process.exit(1);
    });
    mongoose_1.default.connection.on('open', async () => {
        logger_1.default.info({ msg: 'mongo connection open' });
        if (config_1.default.isDevelopment || config_1.default.isTest) {
            await bot_1.default.launch();
        }
        else if (config_1.default.isProduction) {
            logger_1.default.info({
                msg: "setting webhook",
                url: `${config_1.default.BOT_WEBHOOK_URL}${config_1.default.BOT_WEBHOOK_PATH}`,
            });
            // await bot.launch({
            //   webhook: {
            //     domain: config.BOT_WEBHOOK_URL,
            //     hookPath: config.BOT_WEBHOOK_PATH,
            //     port: config.BOT_PORT,
            //     host: config.BOT_HOST,
            //   },
            // });
            await bot_1.default.launch();
            bot_1.default.catch(data => console.log('ERROR', data));
        }
        logger_1.default.info({ msg: `bot started ${bot_1.default.botInfo.username}` });
    });
}
main();
//# sourceMappingURL=app.js.map