'use strict';

angular.module('simDdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/floras', {
        templateUrl: 'app/floras/floras.html',
        controller: 'FlorasCtrl'
      });
  });
