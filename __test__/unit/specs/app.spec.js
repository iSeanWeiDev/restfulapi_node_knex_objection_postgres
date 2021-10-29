import supertest from 'supertest';
import app from '../server';

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
