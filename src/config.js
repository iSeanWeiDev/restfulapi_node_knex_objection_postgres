import dotenv from 'dotenv';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  APP_HOST_NAME: process.env.APP_HOST_NAME,
  PORT: process.env.PORT,
  NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES
};
