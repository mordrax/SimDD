'use strict';

var _ = require('lodash');
var Fauna = require('./fauna.model');

// Get list of faunas
exports.index = function(req, res) {
  Fauna.find(function (err, faunas) {
    if(err) { return handleError(res, err); }
    return res.json(200, faunas);
  });
};

// Get a single fauna
exports.show = function(req, res) {
  Fauna.findById(req.params.id, function (err, fauna) {
    if(err) { return handleError(res, err); }
    if(!fauna) { return res.send(404); }
    return res.json(fauna);
  });
};

// Creates a new fauna in the DB.
exports.create = function(req, res) {
  Fauna.create(req.body, function(err, fauna) {
    if(err) { return handleError(res, err); }
    return res.json(201, fauna);
  });
};

// Updates an existing fauna in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fauna.findById(req.params.id, function (err, fauna) {
    if (err) { return handleError(err); }
    if(!fauna) { return res.send(404); }
    var updated = _.merge(fauna, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, fauna);
    });
  });
};

// Deletes a fauna from the DB.
exports.destroy = function(req, res) {
  Fauna.findById(req.params.id, function (err, fauna) {
    if(err) { return handleError(res, err); }
    if(!fauna) { return res.send(404); }
    fauna.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}