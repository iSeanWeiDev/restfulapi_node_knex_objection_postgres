import app from '../server';
import supertest from 'supertest';

describe('App Controller Test Case', () => {
  test('POST /api/validate', async () => {
    await supertest(app)
      .post('/api/validate')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(200)
      .then((response) => {
        // Check type and length
        console.log(response.body);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
