'use strict';

angular.module('simDdApp')
    .controller('WorldCtrl', function ($scope, WorldService) {
        var refresh = function () {
            WorldService.faunaService.query(function (res) {
                $scope.faunas = res;
            });
            WorldService.floraService.query(function (res) {
                $scope.floras = res;
            });
        };

        setInterval(refresh, 1000);
    });
