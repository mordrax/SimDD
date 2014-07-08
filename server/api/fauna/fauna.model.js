'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FaunaSchema = new Schema({
  name: String,
  type: String,
  attributes: {
      speed: Number,
      hunger: Number,
      attack: Number,
      defense: Number
  }
});

module.exports = mongoose.model('Fauna', FaunaSchema);