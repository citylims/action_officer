'use strict';

describe('Service: ScService', function () {

  // load the service's module
  beforeEach(module('nudgerApp'));

  // instantiate service
  var ScService;
  beforeEach(inject(function (_ScService_) {
    ScService = _ScService_;
  }));

  it('should do something', function () {
    expect(!!ScService).toBe(true);
  });

});
