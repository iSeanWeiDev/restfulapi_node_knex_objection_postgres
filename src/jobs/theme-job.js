import { logHelper } from '@app/helpers';

exports.handler = async (event) => {
  try {
    logHelper.debug({ msg: 'Received event', event });

    if (!event.jobId) {
      logHelper.error({ msg: 'Missing jobId in event', event });
      return;
    }
  } catch (error) {
    logHelper.error({
      msg: 'Caught exception while processing job'
    });
  }
};
