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

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });   
  it('creates studio with POST', () => { // doesn't read an id as any string
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Warner Bros',
        address: {
          city: 'Boston',
          state: 'NY',
          country: 'USA'
        }
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Bros',
          address: {
            city: 'Boston',
            state: 'NY',
            country: 'USA',
          },
          __v: 0
        });
      });
  });

  it('gets all studios', async() => { //TypeError: studiosJSON.forEach is not a function
    const studios = await Studio.create([{ name: 'Warner Beos' }]);

    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        const studiosJSON = JSON.parse(JSON.stringify(studios));
        studiosJSON.forEach(studio => {
          expect(res.body).toContainEqual({
            _id: studio._id,
            name: studio.name
          });
        });  
      });
  });

  it('gets studio by id', async() => {// still doesn't want to read id an any string
    const studio = await Studio.create({
      name: 'Warner Bros',
      address: {
        city: 'Boston',
        state: 'NY',
        country: 'USA'
      }
    });

    return request(app)
      .get(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Warner Bros',
          address: {
            city: 'Boston',
            state: 'NY',
            country: 'USA'
          },
          __v: 0
        });
      });
  });

  it('deletes selected studio', async() =>{
    const studio = await Studio.create({
      name: 'Warner Boss',
      address: {
        city: 'Boston',
        state: 'NY',
        counry: 'USA'
      }
    });

    return request(app)
      .delete(`/api/v1/studios/${studio._id}`)
      .then(res => {
        expect(res.body.name).toEqual('Warner Boss');
      });
  });
});
