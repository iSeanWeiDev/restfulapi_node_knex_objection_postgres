import dotenv from 'dotenv';
import { retrieveSecretValues } from '@app/utils/aws-helper';
dotenv.config();

const config = async () => {
  try {
    const PRODUCTION = process.env.NODE_ENV === 'production';

    const DEV_VARIABLES = {
      NODE_ENV: process.env.NODE_ENV,
      LOG_LEVEL: process.env.LOG_LEVEL,
      APP_HOST_NAME: process.env.APP_HOST_NAME,
      PORT: process.env.PORT,
      SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
      SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
      SCOPES: process.env.SCOPES
    };

    const data = await retrieveSecretValues();
    const variables = JSON.parse(data.SecretString);

    return PRODUCTION ? { ...variables } : { ...DEV_VARIABLES };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default config;
