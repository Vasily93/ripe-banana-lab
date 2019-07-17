const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  }
});
const Studio = mongoose.model('Studio', studioSchema);

module.exports = Studio;
