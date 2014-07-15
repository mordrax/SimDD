'use strict';

describe('Controller: FlorasCtrl', function () {

  // load the controller's module
  beforeEach(module('simDdApp'));

  var FlorasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlorasCtrl = $controller('FlorasCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
