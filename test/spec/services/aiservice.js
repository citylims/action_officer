'use strict';

describe('Service: AIService', function () {

  // load the service's module
  beforeEach(module('nudgerApp'));

  // instantiate service
  var AIService;
  beforeEach(inject(function (_AIService_) {
    AIService = _AIService_;
  }));

  it('should do something', function () {
    expect(!!AIService).toBe(true);
  });

});
