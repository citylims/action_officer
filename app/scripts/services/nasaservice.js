'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.NasaService
 * @description
 * # NasaService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('NasaService', function ($http) {
    var apiUrl = 'https://api.nasa.gov';
    var key = 'Iwko8aFjq9Mw7nQL4Ou7cVEPCvByXKt9kGafWAwD';

    function mars() {
      var query = '/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + key;
      return $http.get(apiUrl + query).then(function(res) {
        return res.data;
      });
    }

    return {
      mars: mars
    };

  });
