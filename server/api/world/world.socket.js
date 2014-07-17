/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var World = require('./world.model');

exports.register = function(socket) {
  World.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  World.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('world:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('world:remove', doc);
}