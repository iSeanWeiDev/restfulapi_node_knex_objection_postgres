/**
 * Module dependencies.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import log from '@app/utils/log';
import ltHelper from '@app/utils/lt-helper';

const DEBUG = process.env.NODE_ENV === 'development';

process.on('uncaughtException', (ex) => {
  log.error(ex);
  process.exit(1);
});

if (DEBUG) {
  const port = process.env.PORT || 8000;
  const server = app.listen(port, async () => {
    try {
      await ltHelper.initialize();
      log.info(`Main Service is listening on port: ${port}`);
    } catch (error) {
      console.log(error);
    }
  });

  // Handle nodemon shutdown cleanly, otherwise the port might not
  // be freed before we start up again.
  process.once('SIGUSR2', () => {
    log.warn('Got SIGUSR2, shutting down...');
    server.close(() => {
      log.warn('Server shut down, exiting.');
      process.exit();
    });
  });
}

export default app;
