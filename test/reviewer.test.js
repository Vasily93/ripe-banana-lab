require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');


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
  
  it('getting all reviewer with GET', async() => {
    const reviewer = await Reviewer.create([{ name: 'somebody', company: 'apple' }]);

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        const reviewerJSON = JSON.parse(JSON.stringify(reviewer));
        reviewerJSON.forEach(reviewer => {
          expect(res.body).toContainEqual({
            _id: reviewer._id,
            name: reviewer.name
          });
        });
      });
  });
});
