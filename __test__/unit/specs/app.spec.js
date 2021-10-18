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
