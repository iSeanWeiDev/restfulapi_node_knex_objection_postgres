import log from '@app/utils/log';

exports.handler = async (event) => {
  try {
    log.debug({ msg: 'Received event', event });

    if (!event.jobId) {
      log.error({ msg: 'Missing jobId in event', event });
      return;
    }
  } catch (error) {
    log.error({
      msg: 'Caught exception while processing job'
    });
  }
};
