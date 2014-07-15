'use strict';

angular.module('simDdApp')
    .controller('FlorasCtrl', function ($scope, WorldService) {
        $scope.message = 'Hello';

        WorldService.floraService.query(function (result) {
            $scope.floras = result;
        });
    });
