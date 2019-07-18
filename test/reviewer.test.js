require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Reviewer = require('../lib/models/Reviewer');


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
  it('creates reviewer with POST', () => {
    return request(app)
      .post('/api/v1/reviwers')
      .send({
        name: 'somebody',
        company: 'apple'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'somebody',
          company: 'apple',
          __v: 0
        });
      });
  });  
  
  
});
