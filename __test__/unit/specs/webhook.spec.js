import supertest from 'supertest';
import app from '../server';

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
      .send({ apiWebhookId: 1079002562751 })
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
