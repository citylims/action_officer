'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.MemeService
 * @description
 * # MemeService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('MemeService', function ($http) {

    function meme() {
      return $http.get('https://api.imgflip.com/get_memes').then(function(res) {
        return(res.data.data.memes);
      });
    }

    return {
      meme: meme
    };
  
  });
