'use strict';

describe('Service: MemeService', function () {

  // load the service's module
  beforeEach(module('nudgerApp'));

  // instantiate service
  var MemeService;
  beforeEach(inject(function (_MemeService_) {
    MemeService = _MemeService_;
  }));

  it('should do something', function () {
    expect(!!MemeService).toBe(true);
  });

});
