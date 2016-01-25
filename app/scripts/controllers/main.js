'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function (GifService, AIService) {
    var vm = this;
    //command ui
    vm.command = '';
    vm.appCommands = ['/', '/manual', '/meme', '/date'];
    vm.commandHistory = [{
      userCommand: 'YO',
      appResponse: 'Test Response'
    }];
    //ui displays
    vm.openSearch = false;
    vm.loading = false;
    vm.displayManual = false;
    //date
    vm.dt = AIService.today();
    vm.formattedDate = moment(vm.dt).format('MM/DD/YYYY');

    function init() {
      getGif();
    }

    function clearCommand() {
      vm.command = '';
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
          clearCommand();
          var aiResponse = AIService.returnResponse();
          var commandObj = {
            userCommand: input,
            appResponse: aiResponse
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
      clearCommand();
      refreshUI();
    };

    function randomGif(gifs) {
      var gif = AIService.randomIndex(gifs);
      return gif.images.downsized.url;
    }

    function refreshUI() {
      vm.openSearch = false;
      vm.myMeme = undefined;
      vm.displayDatePicker = false;
      vm.displayManual = false;
      return;
    }

    vm.submitAppointment = function(msg) {
      if (msg && vm.dt) {
        clearCommand();
        // //make post request to server then...
        console.log(msg);
        var date = moment(vm.dt).format('MM/DD/YYYY');
        var text = date + ' : ' + msg;
        console.log(text);
        var commandObj = {
          appointment: {
            date: date,
            text: msg
          }
        };
        vm.commandHistory.push(commandObj);
      }
    };

    //turn this into case statement and put in service
    function readCommand(command) {
      //no matched
      if (vm.appCommands.indexOf(command) < 0) {
        refreshUI();
      }

      if (command === '/') {
      	vm.openSearch = true;
      }

      if (command === '/manual') {
        vm.displayManual = true;
      }

      if (command === '/meme') {
        if(vm.gifs) {
          vm.myMeme = randomGif(vm.gifs);
        } else {
          vm.myMeme = 'https://i.imgur.com/3p4mOYk.jpg';
        }
      }

      if (command === '/date') {
        vm.displayDatePicker = true;
      }
      // if command doesn't match submit as comment;
    }

    init();
  });
