require('dotenv').config();

const app = require('../lib/app');
const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');
const Actor = require('../lib/models/Actor');

describe('tesing films routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  
  let studio = null;
  beforeEach(async() => {
    studio = JSON.parse(JSON.stringify(await Studio.create({ name: 'Bros' })));
  });
  
  let actor = null;
  beforeEach(async() => {
    actor = JSON.parse(JSON.stringify(await Actor.create({ name: 'Bred' })));
  });


  afterAll(() => {
    return mongoose.connection.close();
  });
  it('creates film with post', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title:'Goblin',
        studio: studio._id,
        released: 1985,
        cast:[{ role: 'lead', actor: actor._id }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title:'Goblin',
          studio: expect.any(String),
          released: 1985,
          cast:[{ _id: expect.any(String),  role: 'lead', actor: expect.any(String) }],
          __v:0
        });
      });
  });

  it('gets all films', async() => {
    const film = await Film.create([{ title: 'Goblin', released: 1985, studio  }]);
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        const filmsJSON = JSON.parse(JSON.stringify(film));
        filmsJSON.forEach(film => {
          expect(res.body).toContainEqual([{
            _id: expect.any(String),
            title:  film.title,
            studio: expect.any(String),
            released: expect.any(Number),
            __v:0
          }]);
        });
      });
  });
});
