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

  