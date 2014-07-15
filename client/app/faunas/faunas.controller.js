'use strict';

angular.module('simDdApp')
    .controller('FaunasCtrl', function ($scope, WorldService) {
        $scope.message = 'Hello';

        WorldService.faunaService.query(function(result) {
                $scope.faunas = result;
        });

        $scope.save = function (data) {
            var saveableData = data;
        };
    });
