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

    function artistTrack(query) {
      query = 'kero kero bonito';
      return $http({
            method: 'GET',
            url: apiUrl + '/tracks/',
            params: {
              client_id: clientID,
              q: query
            }
      }).then(function(res) {
        return res.data;
      });
    }

    function embedLink(id) {
      var link = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+ id + '&color=0066cc';
      return link;
    }

    return {
      artistTrack: artistTrack,
      embedLink: embedLink
    };

  });
