/**
 * Module dependencies.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { localtunnelHelper, appConfigurationHelper, logHelper } from '@app/helpers';
import app from './app';

const DEBUG = process.env.NODE_ENV === 'development';

(async () => {
  const variables = await appConfigurationHelper();
  process.env = { ...process.env, ...variables };
})();

if (DEBUG) {
  const port = process.env.PORT || 8000;
  const server = app.listen(port, async () => {
    try {
      await localtunnelHelper();
      logHelper.info(`Main Service is listening on port: ${port}`);
    } catch (error) {
      logHelper.error(error);
    }
  });

  // Handle nodemon shutdown cleanly, otherwise the port might not
  // be freed before we start up again.
  process.once('SIGUSR2', () => {
    logHelper.warn('Got SIGUSR2, shutting down...');
    server.close(() => {
      logHelper.warn('Server shut down, exiting.');
      process.exit();
    });
  });
}

process.on('uncaughtException', (ex) => {
  logHelper.error(ex);
  process.exit(1);
});

export default app;
