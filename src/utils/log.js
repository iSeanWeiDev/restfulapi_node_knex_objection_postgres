import pino from 'pino';

const logConfig = {
  base: null,
  level: process.env.LOG_LEVEL || 'info'
};

if (process.env.NODE_ENV !== 'production') {
  // Note: pino-pretty is installed as a dev package
  logConfig.prettyPrint = {
    ignore: 'pid,hostname',
    colorize: true
  };
}

export default pino(logConfig);
