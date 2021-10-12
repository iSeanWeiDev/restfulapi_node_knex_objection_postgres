const awsServerlessExpress = require('aws-serverless-express');

let app;
try {
  app = require('./dist');
} catch (e) {
  console.log('import app error', e);
}

const server = awsServerlessExpress.createServer(app.default);

// NOTE: the downside of loading above is environment variables are initially loaded immediately,
//       so changing them means that the code must test environment variable inline
//       (rather than use a const set on-load)
// We should NOT load app and server inside the handler,
// or all connection pools and state are re-instantiated per-request:
// See: http://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code
// "Separate the Lambda handler (entry point) from your core logic"

exports.handler = async (event, context) => {
  const startTime = context.getRemainingTimeInMillis ? context.getRemainingTimeInMillis() : 0;
  const webResponse = awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
  if (process.env.DEBUG_SCALING) {
    const endTime = context.getRemainingTimeInMillis ? context.getRemainingTimeInMillis() : 0;
    if (endTime - startTime > 3000) {
      console.log('SLOW_RESPONSE milliseconds:', endTime - startTime, event);
    }
  }
  return webResponse;
};
