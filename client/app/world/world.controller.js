'use strict';

angular.module('simDdApp')
    .controller('WorldCtrl', function ($scope, WorldService, socket) {
        $scope.faunas = [];
        socket.syncUpdates('fauna', $scope.faunas);
    });
