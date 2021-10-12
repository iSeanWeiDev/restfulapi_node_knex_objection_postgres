import localtunnel from 'localtunnel';
import config from '@app/config';

const initialize = async () => {
  const opts = {
    host: 'https://localtunnel.me',
    port: config.PORT
  };
  const tunnel = await localtunnel(opts);
  process.env = { ...process.env, APP_HOST_NAME: tunnel.url };
  try {
  } catch (error) {
    throw error;
  }
};

export default {
  initialize
};
