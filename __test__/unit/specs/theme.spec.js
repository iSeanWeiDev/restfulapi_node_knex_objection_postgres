import app from '../server';
import supertest from 'supertest';

describe('Theme Controller Test Case', () => {
  // test('GET /api/themes', async () => {
  //   await supertest(app)
  //     .get('/api/themes')
  //     .set('shopname', 'gate4life2.myshopify.com')
  //     .set('accesstoken', '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')
  //     .expect(200)
  //     .then((response) => {
  //       // Check type and length
  //       console.log(JSON.stringify(response.body, null, 2));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  test('DELETE /api/themes/:themeId', async () => {
    await supertest(app)
      .delete('/api/themes/1')
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
