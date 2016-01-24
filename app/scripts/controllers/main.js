'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function () {
    var vm = this;
    // var result = document.querySelector('.result');
    var result = angular.element('.reslut');
    console.log(result);

    vm.command = '';
    vm.openSearch = false;

    vm.change = function(input) {

    	if (input === '/') {
      	vm.openSearch = true;
      } else {
      	vm.openSearch = false;
      }

      if (input === '/meme') {
      	vm.myMeme = 'https://i.imgur.com/3p4mOYk.jpg';
      }

    };

    vm.submitCommand = function(input) {
      console.log(input);
      if (input) {
        var commandObj = {
          userCommand: input,
          appResponse: 'oh yeah'
        };
        scrollToBottom();
        vm.commandHistory.push(commandObj);
      }
    };

    function scrollToBottom() {
      console.log(result);
      result.scrollTop = result.scrollHeight;
    }

    vm.commandHistory = [{
      userCommand: 'YO',
      appResponse: 'Null'
    }];

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
