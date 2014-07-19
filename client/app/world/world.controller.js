'use strict';

angular.module('simDdApp')
    .controller('WorldCtrl', function ($scope, WorldService) {
        WorldService.worldService.query({id:'7468654f6e65416e644f6c79'}, function (data) {
            $scope.world = data;
        });
    });
