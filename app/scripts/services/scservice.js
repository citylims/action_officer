'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.ScService
 * @description
 * # ScService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('ScService', function ($http) {

    var apiUrl = 'http://api.soundcloud.com';
    var clientID = 'e5e26b3721228c688c5c6aad064ea00b';

    function tester(query) {
      query = 'kero kero bonito';
      $http({
            method: 'GET',
            url: apiUrl + '/tracks/',
            params: {
              client_id: clientID,
              q: query
            }
      }).then(function(res) {
        console.log(res);
      });
    }

    return {
      tester: tester
    };

  });
