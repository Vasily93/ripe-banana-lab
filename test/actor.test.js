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

  it('getting all actor with GET', async() => {
    const actor = await Actor.create({ name: 'Brad Pit' });

    return request(app)
      .get('/api.v1/actors')
      .then(res => {
        const actorsJSON = JSON.parse(JSON.stringify(actor));
        actorsJSON.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: actor._id,
            name: actor.name
          });
        });
      });
  });

  it('get actor by id', async() => {
    const actor = await Actor.create({ 
      name: 'Brad Pit',
      DOB: '1993-09-08',
      POB: 'USA'
    });

    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then(res => {
        expect.any(res.body).toEqual({
          _id: expect.any(String),
          name:  'Brad Pit',
          DOB: '1993-09-08',
          POB: 'USA',
          __v: 0
        });
      });
  });

  it('can update an actor with PUT', async() => {
    const actor = await Actor.create({ 
      name: 'Brad Pit',
      DOB: '1993-09-08',
      POB: 'USA'
    });

    return request(app)
      .put(`/api/v1/actors/${actor._id}`)
      .send({ name: 'Vasily Markov', DOB: '1992-07-02', POB: 'RUS' })
      .then(res => {
        const actorJSON = JSON.parse(JSON.stringify(actor));
        expect(res.body).toEqual({
          ...actorJSON,
          name: 'Vasily Markov',
          DOB: '1992-07-02',
          POB: 'RUS'
        });
      });
  });
});
