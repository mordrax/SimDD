'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FloraSchema = new Schema({
    name: String,
    type: String,
    attributes: {
        fruitage: Number,
        basecover: Number
    },
    coords : {
        x: Number,
        y: Number
    }
});

module.exports = mongoose.model('Flora', FloraSchema);