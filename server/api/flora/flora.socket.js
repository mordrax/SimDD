/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Flora = require('./flora.model');

exports.register = function(socket) {
  Flora.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Flora.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('flora:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('flora:remove', doc);
}