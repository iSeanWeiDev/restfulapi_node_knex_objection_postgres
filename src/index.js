/**
 * Module dependencies.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import log from '@app/utils/log';
import { shopifyService } from '@app/services';

const PROD = process.env.NODE_ENV === 'production';

process.on('uncaughtException', (ex) => {
  log.error(ex);
  process.exit(1);
});

(function () {
  if (PROD) shopifyService.initialize();
})();

export default app;
