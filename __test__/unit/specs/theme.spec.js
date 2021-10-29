import supertest from 'supertest';
import app from '../server';

describe('Theme Controller Test Case', () => {
  test('API load themes', async () => {
    await supertest(app)
      .post('/test/themes')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(200)
      .then((response) => {
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  test.skip('API delete theme', async () => {
    await supertest(app)
      .delete('/test/themes')
      .set('shopname', 'gate4life2')
      .set('accesstoken', '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')
      .send({ themeId: '127528599743' })
      .expect(200)
      .then((response) => {
        expect(response.body).toBe({});
      })
      .catch((error) => {
        console.log(error);
      });
  });

  test.skip('GET /api/themes', async () => {
    await supertest(app)
      .get('/api/themes')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(200)
      .then((response) => {
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  test.skip('DELETE /api/themes/:themeId', async () => {
    await supertest(app)
      .delete('/api/themes/1')
      .set('shopname', 'gate4life2.myshopify.com')
      .set('accesstoken', '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')
      .expect(204)
      .then((response) => {
        console.log(JSON.stringify(response.body, null, 2));
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
