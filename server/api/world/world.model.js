'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WorldSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  tiles:[{
      coords:{
          x:Number,
          y:Number
      },
      type:String
  }]
});

module.exports = mongoose.model('World', WorldSchema);