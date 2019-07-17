const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');


describe('testig sudio routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });   
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
