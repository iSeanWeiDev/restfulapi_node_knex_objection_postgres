import AWS from 'aws-sdk';

const PRODUCTION = process.env.NODE_ENV === 'production';

if (!PRODUCTION) {
  var credentials = new AWS.SharedIniFileCredentials({ profile: 'lexima' });
  AWS.config.credentials = credentials;
}

export const retrieveSecretValues = () =>
  new Promise((resolve, reject) => {
    const client = new AWS.SecretsManager({
      region: process.env.REGION
    });

    client.getSecretValue({ SecretId: process.env.SECRET_NAME }, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
