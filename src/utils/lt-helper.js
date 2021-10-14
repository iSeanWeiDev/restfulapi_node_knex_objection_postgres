import localtunnel from 'localtunnel';

const initialize = async () => {
  const opts = {
    host: 'https://localtunnel.me',
    port: process.env.PORT
  };
  const tunnel = await localtunnel(opts);
  console.log(tunnel.url);
  process.env = { ...process.env, APP_HOST_NAME: tunnel.url };
  try {
  } catch (error) {
    throw error;
  }
};

export default {
  initialize
};
