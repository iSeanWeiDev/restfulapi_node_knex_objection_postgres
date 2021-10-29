import dotenv from 'dotenv';
import { AWSProvider } from '@app/providers';

dotenv.config();

const appConfigurationHelper = async () => {
  const PRODUCTION = process.env.NODE_ENV === 'production';

  if (PRODUCTION) {
    const awsProvider = new AWSProvider();
    const variables = await awsProvider.retrieveSecretValues();
    return JSON.parse(variables.SecretString);
  }

  return {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    APP_HOST_NAME: process.env.APP_HOST_NAME,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_MIN_POOL: process.env.DB_MIN_POOL,
    DB_MAX_POOL: process.env.DB_MAX_POOL,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_SCOPES: process.env.SCOPES,
    AWS_REGION: process.env.AWS_REGION,
    AWS_SECRET_ARN: process.env.AWS_SECRET_ARN,
    AWS_S3_SCRIPT_URI: process.env.AWS_S3_SCRIPT_URI,
    AWS_S3_ASSET_URL: process.env.AWS_S3_ASSET_URL
  };
};

export default appConfigurationHelper;
