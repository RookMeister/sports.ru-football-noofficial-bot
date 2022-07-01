import mongoose from 'mongoose';

import config from '@helpers/config';
import logger from '@helpers/logger';
import bot from '@bot/bot';

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
process.on("uncaughtException", (error) => logger.error(error));

function main() {
  mongoose.connect(config.MONGO, {
    autoIndex: true, //make this also true
  });
  mongoose.connection.on('error', err => {
    logger.info({ msg: 'mongo connection error'});
    process.exit(1);
  });
  mongoose.connection.on('open', async () => {
    logger.info({ msg: 'mongo connection open' });
    if (config.isDevelopment || config.isTest) {
      await bot.launch();
      bot.catch(data => console.log('ERROR', data));
    } else if (config.isProduction) {
      // logger.info({
      //   msg: "setting webhook",
      //   url: `${config.BOT_WEBHOOK_URL}${config.BOT_WEBHOOK_PATH}`,
      // });
      // await bot.launch({
      //   webhook: {
      //     domain: config.BOT_WEBHOOK_URL,
      //     // hookPath: config.BOT_WEBHOOK_PATH,
      //     port: config.BOT_PORT,
      //     host: config.BOT_HOST,
      //   },
      // });
      await bot.launch();
      bot.catch(data => console.log('ERROR', data));
    }

    bot && bot.botInfo && logger.info({ msg: `bot started ${bot.botInfo.username}` });
  });
}
main();
