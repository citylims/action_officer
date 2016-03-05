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

    function apod() {
      var query = '/planetary/apod?api_key=' + key;
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
      console.log(day);
      if (day === 1) {
        day = 2;
      }
      arr[0] = year + '-' + month + '-' + (day - 1);
      arr[1] = year + '-' + month + '-' + day;
      return arr;
    }
    
    function readAsteroid(data, command) {
      var asteroids= data.near_earth_objects;
      var today = asteroids[Object.keys(asteroids)[Object.keys(asteroids).length - 1]];
      var asteroid = today.pop();
      var magnitude  = Math.round(asteroid.absolute_magnitude_h);
      var approach = asteroid.close_approach_data.pop();
      var velocity = Math.round(approach.relative_velocity.miles_per_hour);
      var missDistance = Math.round(approach.miss_distance.miles);
      var msg = data.element_count + ' near earth objects have been recorded in the past 24 hours. Most recently ' + asteroid.name + ' which has an absolute magnitude of ' + magnitude + 'h, is traveling at ' + velocity + 'mph, and is ' + missDistance + 'mi. away from Earth.';
      var feedObj = {
        userCommand: command,
        appResponse: msg
      };
      return feedObj;      
    }

    return {
      mars: mars,
      asteroids: asteroids,
      apod: apod,
      readAsteroid: readAsteroid
    };

  });
