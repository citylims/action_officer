'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function (GifService) {
    var vm = this;
    vm.command = '';
    vm.openSearch = false;
    vm.appCommands = ['/', '/meme'];
    vm.commandHistory = [{
      userCommand: 'YO',
      appResponse: 'Test Response'
    }];

    function init() {
      getGif();
    }

    function getGif() {
      GifService.trendingGif().then(function(data) {
        vm.gifs = data;
      });
    }

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
      var commandObj = {
        image: input
      };
      vm.commandHistory.push(commandObj);
      vm.command = '';
      refreshUI();
    };

    function randomGif(gifs) {
      var gif = gifs[Math.floor(Math.random()*gifs.length)];
      return gif.images.downsized.url;
    }

    function refreshUI() {
      vm.openSearch = false;
      vm.myMeme = undefined;
      return;
    }

    //turn this into case statement and put in service
    function readCommand(command) {
      //no matched
      if (vm.appCommands.indexOf(command) < 0) {
        //inactive
        refreshUI();
      }

      if (command === '/') {
      	vm.openSearch = true;
      }

      if (command === '/meme') {
        if(vm.gifs) {
          vm.myMeme = randomGif(vm.gifs);
        } else {
          vm.myMeme = 'https://i.imgur.com/3p4mOYk.jpg';
        }
      }
      // if command doesn't match submit as comment;
    }

    init();
  });
