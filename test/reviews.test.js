require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

describe('tesing reviews routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let reviewer = null;
  beforeEach(async() => {
    reviewer = JSON.parse(JSON.stringify(await Reviewer.create({ name: 'Vasily' })));
  });

  let film = null;
  beforeEach(async() => {
    film = JSON.parse(JSON.stringify(await Film.create({ title: 'Gorilla' })));
  });


  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates review with post', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer._id,
        review: 'very good movie',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: expect.any(String),
          review: 'very good movie',
          film: expect.any(String),
          __v:0
        });
      });
  });
});
