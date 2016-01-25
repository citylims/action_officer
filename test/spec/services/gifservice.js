'use strict';

describe('Service: GifService', function () {

  // load the service's module
  beforeEach(module('nudgerApp'));

  // instantiate service
  var GifService;
  beforeEach(inject(function (_GifService_) {
    GifService = _GifService_;
  }));

  it('should do something', function () {
    expect(!!GifService).toBe(true);
  });

});
