'use strict';

angular.module('simDdApp')
    .controller('WorldCtrl', function ($scope, WorldService) {
        WorldService.worldService.query(function (data) {
            $scope.world = data;
        });
    });
