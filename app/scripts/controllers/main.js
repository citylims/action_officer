'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function ($scope) {

    // var result = document.querySelector('.result');
    var result = angular.element('.reslut');
    console.log(result);

    $scope.command = '';
    $scope.openSearch = false;

    $scope.change = function(input) {

    	if (input === '/') {
      	$scope.openSearch = true;
      } else {
      	$scope.openSearch = false;
      }

      if (input === '/meme') {
      	$scope.myMeme = 'https://i.imgur.com/3p4mOYk.jpg';
      }

    };

    $scope.submitCommand = function(input) {
      console.log(input);
      if (input) {
        var commandObj = {
          userCommand: input,
          appResponse: 'oh yeah'
        };
        scrollToBottom();
        $scope.commandHistory.push(commandObj);
      }
    };

    function scrollToBottom() {
      console.log(result);
      result.scrollTop = result.scrollHeight;
    }

    $scope.commandHistory = [{
      userCommand: 'YO',
      appResponse: 'Null'
    }];

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
