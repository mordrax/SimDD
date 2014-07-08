/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Fauna = require('./fauna.model');

exports.register = function(socket) {
  Fauna.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Fauna.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('fauna:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('fauna:remove', doc);
}