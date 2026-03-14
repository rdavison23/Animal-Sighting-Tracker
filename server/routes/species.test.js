const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('get species', () => {
  it('GET /species should show all species', async () => {
    const res = await request.get('/species');
    expect(res.status).toBe(200);
  });
});
