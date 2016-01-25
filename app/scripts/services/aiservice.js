'use strict';

/**
 * @ngdoc service
 * @name nudgerApp.AIService
 * @description
 * # AIService
 * Service in the nudgerApp.
 */
angular.module('nudgerApp')
  .service('AIService', function () {

    var responses = ['oh yeah?', 'awesome', 'type / to see command options'];

    function returnResponse() {
      var response = randomIndex(responses);
      return response;
    }

    function randomIndex(arr) {
      var index = arr[Math.floor(Math.random()*arr.length)];
      return index;
    }

    return {
      returnResponse: returnResponse,
      randomIndex: randomIndex
    };
  });
