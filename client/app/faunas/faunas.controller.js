'use strict';

angular.module('simDdApp')
    .controller('FaunasCtrl', function ($scope, $http) {
        $scope.message = 'Hello';

        $http.get('/api/faunas')
            .success(function(result) {
                $scope.faunas = result;
        });

        $scope.save = function (data) {
            var saveableData = data;
        };
    });
