import app from '../server';
import supertest from 'supertest';

describe('Schedule Controller Test Case', () => {
  test('GET /api/schedules', async () => {
    await supertest(app)
      .get('/api/schedules')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
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
