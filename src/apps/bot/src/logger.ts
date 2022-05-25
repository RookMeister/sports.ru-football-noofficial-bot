import Logger from "pino";
import config from "~/apps/bot/src/config";

export const loggerOptions: Logger.LoggerOptions = {
  level: config.LOG_LEVEL,
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
};

if (config.isDevelopment) {
  loggerOptions.base = {};
  loggerOptions.prettyPrint = {
    colorize: true,
    translateTime: true,
  };
} 

const logger = Logger(loggerOptions);

export default logger;
