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

    function today() {
      return new Date();
    }

    function formattedDate() {
      var date = new Date();
      var formatted = moment(date).format('MM/DD/YYYY');
      return formatted;
    }

    function sudo(command) {
      var cmd = command ? command : 'sudo';
      var obj = {};
      var errMsg = cmd + ' Access Denied: ';
      for (var i = 0; i <= 2; i++) {
        var spike = cycle();
        errMsg = (errMsg + spike);
      }
      obj.err = errMsg;
      return obj;
    }

    function lorem() {
      var obj = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      };
      return obj;
    }

    var cycle = function(index) {
      var bit = (Math.floor(Math.random() * 1000000000));
      var int = getRandomInt(bit, (bit * 2));
      console.log(int);
      if (index % 2  === 0) {
        return bit;
      } else {
        var process = Math.pow(bit, 2);
        return process;
      }
    };

    var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
      returnResponse: returnResponse,
      randomIndex: randomIndex,
      today: today,
      formattedDate: formattedDate,
      sudo: sudo,
      getRandomInt: getRandomInt,
      lorem: lorem
    };

  });
