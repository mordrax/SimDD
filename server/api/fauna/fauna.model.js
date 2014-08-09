'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FaunaSchema = new Schema({
  id: String,
  position: {
      x: Number,
      y: Number
  }
});

module.exports = mongoose.model('Fauna', FaunaSchema);