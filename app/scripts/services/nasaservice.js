'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.NasaService
 * @description
 * # NasaService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('NasaService', function ($http, AIService) {
    var apiUrl = 'https://api.nasa.gov';
    var key = 'Iwko8aFjq9Mw7nQL4Ou7cVEPCvByXKt9kGafWAwD';
    var formattedDate = AIService.formattedDate();


    function mars() {
      var query = '/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=' + key;
      return $http.get(apiUrl + query).then(function(res) {
        return res.data;
      });
    }

    function asteroids() {
      var dates = processDate(formattedDate);
      var query = '/neo/rest/v1/feed?start_date=' + dates[0] + '&end_date=' + dates[1] +'&api_key=' + key;
      return $http.get(apiUrl + query).then(function(res) {
        return res.data;
      });
    }

    function processDate(date){
      var arr = [];
      var parts = date.split('/');
      var day = parseInt(parts[1]);
      var month = parts[0];
      var year = parts[2];
      arr[0] = year + '-' + month + '-' + (day - 1);
      arr[1] = year + '-' + month + '-' + day;
      return arr;
    }

    return {
      mars: mars,
      asteroids: asteroids
    };

  });
