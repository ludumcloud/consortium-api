import * as winston from 'winston';

const levels: Record<string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  trace: 5
};

const logger: winston.Logger = winston.createLogger({
  level: 'info',
  levels,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;
