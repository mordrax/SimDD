'use strict';

angular.module('simDdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/world', {
        templateUrl: 'app/world/world.html',
controller: 'WorldCtrl'
});
});
