import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from '@app/app';
import log from '@app/utils/log';

app.listen(8000, () => {
  log.info(`Main Service is listening on port: ${8000}`);
});

export default app;
