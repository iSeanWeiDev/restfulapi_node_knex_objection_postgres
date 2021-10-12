import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import log from '@app/utils/log';
import ltHelper from '@app/utils/lt-helper';
import database from '@app/database';
import config from '@app/config';
import routes from '@app/routes';

// Configure the utils before loading.
database.enableTracing();
const DEBUG = config.NODE_ENV !== 'production';

// Setup the app.
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://themeflight.com']
  })
);

if (!DEBUG) {
  app.set('trust proxy', 1);
  app.use(awsServerlessExpressMiddleware.eventContext());
}

if (DEBUG) app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

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
