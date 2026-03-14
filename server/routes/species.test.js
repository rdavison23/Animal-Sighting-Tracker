const server = require('../server.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('get species', () => {
  it('GET /species should show all species', async () => {
    const res = await requestWithSupertest.get('/species');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
  });
});
