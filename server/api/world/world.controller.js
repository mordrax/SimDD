'use strict';

var _ = require('lodash');
var World = require('./world.model');

// Get list of worlds
exports.index = function(req, res) {
  World.find(function (err, worlds) {
    if(err) { return handleError(res, err); }
    res.json(200, worlds);
  });
};

// Get a single world
exports.show = function(req, res) {
  World.findById(req.params.id, function (err, world) {
    if(err) { return handleError(res, err); }
    if(!world) { return res.send(404); }
    return res.json(world);
});
};

// Creates a new world in the DB.
exports.create = function(req, res) {
  World.create(req.body, function(err, world) {
    if(err) { return handleError(res, err); }
    return res.json(201, world);
  });
};

// Updates an existing world in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  World.findById(req.params.id, function (err, world) {
    if (err) { return handleError(err); }
    if(!world) { return res.send(404); }
    var updated = _.merge(world, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, world);
    });
  });
};

// Deletes a world from the DB.
exports.destroy = function(req, res) {
  World.findById(req.params.id, function (err, world) {
    if(err) { return handleError(res, err); }
    if(!world) { return res.send(404); }
    world.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}