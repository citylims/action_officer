'use strict';

describe('Service: NasaService', function () {

  // load the service's module
  beforeEach(module('nudgerApp'));

  // instantiate service
  var NasaService;
  beforeEach(inject(function (_NasaService_) {
    NasaService = _NasaService_;
  }));

  it('should do something', function () {
    expect(!!NasaService).toBe(true);
  });

});
