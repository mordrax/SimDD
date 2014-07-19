'use strict';

angular.module('simDdApp')
    .factory('WorldService', function WorldService($resource) {
        return {
            faunaService : $resource('api/faunas/:id', {id:"@id"}),
            floraService : $resource('api/floras/:id', {id:"@id"}),
            worldService : $resource('api/worlds/:id', {id:"@id"})
        }
    });
