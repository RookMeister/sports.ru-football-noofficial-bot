import Logger from 'pino';

export const loggerOptions: Logger.LoggerOptions = {
  level: 'debug',
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
};

const logger = Logger(loggerOptions);

export default logger;
