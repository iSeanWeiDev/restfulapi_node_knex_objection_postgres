/**
 * Module dependencies.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import log from '@app/utils/log';

process.on('uncaughtException', (ex) => {
  log.error(ex);
  process.exit(1);
});

export default app;
