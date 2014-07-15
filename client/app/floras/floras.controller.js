'use strict';

angular.module('simDdApp')
    .controller('FlorasCtrl', function ($scope, WorldService, ngTableParams, $filter) {
        $scope.message = 'Hello';

        WorldService.floraService.query(function (data) {
            $scope.florasTable = new ngTableParams({
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

                    $scope.floras = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.floras);
                }
            });
        });
    });
