import localtunnel from 'localtunnel';
import log from './log-helper';

const localtunnelHelper = async () => {
  const opts = {
    host: 'https://localtunnel.me',
    port: process.env.PORT || 8000
  };

  const tunnel = await localtunnel(opts);
  log.info(`local turnnel server is running on ${tunnel.url}`);
  process.env = { ...process.env, APP_HOST_NAME: tunnel.url };
};

export default localtunnelHelper;
