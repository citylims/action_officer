'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.GifService
 * @description
 * # GifService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('GifService', function ($http) {

    var apiUrl = 'http://api.giphy.com/';
    var publicKey = '?api_key=dc6zaTOxFJmzC';

    function trendingGif() {
      return $http.get(apiUrl + '/v1/gifs/trending' + publicKey).then(function(res) {
        return res.data.data;
      });
    }

    return {
      trendingGif: trendingGif
    };

  });
