import pino from 'pino';
import config from '@app/config';

const logConfig = {
  base: null,
  level: config.LOG_LEVEL
};

if (config.NODE_ENV !== 'production') {
  // Note: pino-pretty is installed as a dev package
  logConfig.prettyPrint = {
    ignore: 'pid,hostname',
    colorize: true
  };
}

export default pino(logConfig);
