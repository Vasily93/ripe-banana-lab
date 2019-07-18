const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  
  DOB: {
    type: Date
  },   
  POB: {
    type: String
  }
});
const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
