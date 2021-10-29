import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from '@app/app';
import { logHelper } from '@app/helpers';

app.listen(8000, () => {
  logHelper.info(`Main Service is listening on port: ${8000}`);
});

export default app;
