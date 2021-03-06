import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import database from '@app/database';
import routes from '@app/routes';

// Configure the utils before loading.
const DEBUG = process.env.NODE_ENV !== 'production';
database.enableTracing();

// Setup the app.
const app = express();

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use('/public', express.static(path.join(__dirname, '../public')));

if (!DEBUG) {
  app.set('trust proxy', 1);
  app.use(awsServerlessExpressMiddleware.eventContext());
}

// eslint-disable-next-line global-require
if (DEBUG) app.use(require('morgan')('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.messge = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
