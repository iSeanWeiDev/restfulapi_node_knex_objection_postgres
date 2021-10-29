// eslint-disable-next-line import/no-extraneous-dependencies
import AWS from 'aws-sdk';
import fs from 'fs';

class AWSAProvider {
  constructor() {
    const PRODUCTION = process.env.NODE_ENV === 'production';
    if (!PRODUCTION) {
      const credentials = new AWS.SharedIniFileCredentials({ profile: 'lexima' });
      AWS.config.credentials = credentials;
    }

    this.secretManager = new AWS.SecretsManager({
      region: process.env.AWS_REGION
    });

    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION
    });
  }

  retrieveSecretValues() {
    return new Promise((resolve, reject) => {
      this.secretManager.getSecretValue({ SecretId: process.env.AWS_SECRET_ARN }, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  uploadScriptTagToS3(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile('./utils/openpixel.js', (err, data) => {
        if (err) reject(err);

        const params = {
          Bucket: process.env.AWS_S3_ASSET_NAME,
          Key: `scripts/${fileName}.js`,
          Body: JSON.stringify(data, null, 2)
        };

        this.s3.upload(params, (s3Err, s3Data) => {
          if (s3Err) reject(s3Err);
          resolve(s3Data.Location);
        });
      });
    });
  }
}

export default AWSAProvider;
