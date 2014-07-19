'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorldSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  tiles: [Schema.Types.Mixed]
});

module.exports = mongoose.model('World', WorldSchema);