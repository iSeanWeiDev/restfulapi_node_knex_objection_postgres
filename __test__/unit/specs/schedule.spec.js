import app from '../server';
import supertest from 'supertest';

describe('App Controller Test Case', () => {
  test('GET /api/schdules/:id', async () => {
    await supertest(app)
      .get('/api/themes')
      .send({
        shopName: 'gate4life2.myshopify.com',
        accessToken: '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'
      })
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
