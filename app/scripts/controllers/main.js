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
    vm.command = '';
    vm.openSearch = false;
    vm.appCommands = ['/', '/meme'];
    vm.commandHistory = [{
      userCommand: 'YO',
      appResponse: 'Test Response'
    }];

    vm.change = function(input) {
      readCommand(input);
    };

    vm.submitCommand = function(input) {
      if (input) {
        if (vm.appCommands.indexOf(input) >= 0) {
          readCommand(input);
        } else {
          vm.command = '';
          var commandObj = {
            userCommand: input,
            appResponse: 'oh yeah'
          };
          vm.commandHistory.push(commandObj);
        }
      }
    };

    vm.selectMeme =  function(input) {
      console.log(input);
      var commandObj = {
        image: input
      };
      vm.commandHistory.push(commandObj);
      vm.command = '';
    };

    //turn this into case statement and put in service
    function readCommand(command) {

      if (vm.appCommands.indexOf(command) < 0) {
        return;
      }

      if (command === '/') {
      	vm.openSearch = true;
      } else {
      	vm.openSearch = false;
      }

      if (command === '/meme') {
      	vm.myMeme = 'https://i.imgur.com/3p4mOYk.jpg';
      } else {
        vm.myMeme = null;
      }

      // if command doesn't match submit as comment;
    }

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
