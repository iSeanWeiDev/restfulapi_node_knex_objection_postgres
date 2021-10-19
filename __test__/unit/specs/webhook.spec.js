import app from '../server';
import supertest from 'supertest';

describe('Webhook Controller Test Case', () => {
  test.skip('POST /api/webhooks', async () => {
    await supertest(app)
      .post('/api/webhooks')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(201)
      .then((response) => {
        // Check type and length
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  test('GET /api/webhooks', async () => {
    await supertest(app)
      .get('/api/webhooks')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(201)
      .then((response) => {
        // Check type and length
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  test.skip('DELETE /api/webhooks', async () => {
    await supertest(app)
      .delete('/api/webhooks')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .send({ apiWebhookId: 1078972678335 })
      .expect(200)
      .then((response) => {
        // Check type and length
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
