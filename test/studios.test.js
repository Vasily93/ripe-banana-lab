require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');


describe('testig sudio routes', () => {
  beforeAll(() => {
    connect();
  });

  // beforeEach(() => {
  //   return mongoose.connection.dropDatabase();
  // });

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

  it('gets all studios', async() => {
    const studio = await Studio.create({ name: 'Warner Beos' });

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual([studio]);
      });
  });
});
