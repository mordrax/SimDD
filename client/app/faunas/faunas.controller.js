'use strict';

angular.module('simDdApp')
    .controller('FaunasCtrl', function ($scope, WorldService, ngTableParams, $filter, socket) {
        $scope.message = 'Hello';

        $scope.faunas = [];
        socket.syncUpdates('fauna', $scope.faunas);

        /*WorldService.faunaService.query(function (data) {
            $scope.faunasTable = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                filter: {
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;

                    $scope.faunas = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.faunas);
                }
            });
        });*/

        $scope.save = function (data) {
            var saveableData = data;
        };
    });
