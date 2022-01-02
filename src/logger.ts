import Logger from "pino";
import config from "@bot/config";

export const loggerOptions: Logger.LoggerOptions = {
  level: config.LOG_LEVEL,
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
