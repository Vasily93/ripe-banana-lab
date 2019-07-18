const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, DOB, POB } = req.body;
    Actor
      .create({ name, DOB, POB })
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({  _id: true, name: true })
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    const { name, DOB, POB } = req.body;

    Actor
      .findByIdAndUpdate(req.params.id, { name, DOB, POB }, { new: true })
      .then(actor => res.send(actor))
      .catch(next);
  })

  