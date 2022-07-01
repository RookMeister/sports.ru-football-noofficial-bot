import Logger from 'pino';

export const loggerOptions: Logger.LoggerOptions = {
  level: 'debug',
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
};

const loggerExp = Logger(loggerOptions);

export default loggerExp;
