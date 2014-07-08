'use strict';

describe('Controller: FaunasCtrl', function () {

  // load the controller's module
  beforeEach(module('simDdApp'));

  var FaunasCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaunasCtrl = $controller('FaunasCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
