require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('tesind actor routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates actor with POST', () => {
    return request(app)
      .post('/pai/v1/actors')
      .send({
        name: 'bred pit',
        DOB: '1993-09-08',
        POB: 'USA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'bred pit',
          DOB: '1993-09-08',
          POB: 'USA',
          __v: 0
        });
      });
  });

  
});
