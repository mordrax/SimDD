'use strict';

angular.module('simDdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/faunas', {
        templateUrl: 'app/faunas/faunas.html',
        controller: 'FaunasCtrl'
      });
  });
