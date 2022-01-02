import "module-alias/register";

import mongoose from 'mongoose';

import config from "@bot/config";
import logger from "@bot/logger";
import bot from "@bot/bot";

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
process.on("uncaughtException", (error) => logger.error(error));

function main() {
  mongoose.connect(process.env.MONGO);
  mongoose.connection.on('error', err => {
    logger.error(
      undefined,
      `mongo connection error`,
      err
    );
    process.exit(1);
  });
  mongoose.connection.on('open', async () => {
    logger.info({ msg: 'mongo connection open' });
    if (config.isDevelopment || config.isTest) {
      await bot.launch();
    } else if (config.isProduction) {
      logger.info({
        msg: "setting webhook",
        url: `${config.BOT_WEBHOOK_URL}${config.BOT_WEBHOOK_PATH}`,
      });
      // await bot.launch({
      //   webhook: {
      //     domain: config.BOT_WEBHOOK_URL,
      //     hookPath: config.BOT_WEBHOOK_PATH,
      //     port: config.BOT_PORT,
      //     host: config.BOT_HOST,
      //   },
      // });
      await bot.launch();
      bot.catch(data => console.log('ERROR', data));
    }

    logger.info({ msg: `bot started ${bot.botInfo.username}` });
  });
}
main();
