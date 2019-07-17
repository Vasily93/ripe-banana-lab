const app = require('../lib/app');
const request = require('supertest');


describe('testig sudio routes', () => {
  it('creates studio with PUT', () => {
    return request(app)
      .post('/api/v1/studios')
      .send({ name: 'Warner Bros' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Bros',
          __v: 0
        });
      });
  });
});
