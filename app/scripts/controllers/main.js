'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function ($http, GifService, AIService, MemeService, NasaService) {
    var vm = this;
    //command ui
    vm.command = '';
    vm.appCommands = ['/', '/manual', '/gif', '/date', '/meme', '/clear', '/mars'];
    vm.commandHistory = [{
      appResponse: 'Welcome'
    }];
    //ui displays
    vm.openSearch = false;
    vm.loading = false;
    vm.displayManual = false;
    //date
    vm.dt = AIService.today();
    vm.formattedDate = moment(vm.dt).format('MM/DD/YYYY');

    function init() {
      vm.loading = true;
      getGifs();
      getMemes();
      getMars();
    }

    function pushCommand(obj) {
      vm.commandHistory.push(obj);
      clearCommand();
      refreshUI();
    }

    function clearCommand() {
      vm.command = '';
      vm.dateMessage = '';
    }

    function getGifs() {
      GifService.trendingGif().then(function(data) {
        vm.loading = false;
        vm.gifs = data;
      });
    }

    function getMemes() {
      MemeService.meme().then(function(data) {
        vm.loading = false;
        vm.memes = data;
      });
    }

    function getMars() {
      NasaService.mars().then(function(data){
        vm.loading = false;
        vm.mars = data.photos;
        console.log(vm.mars);
      });
    }

    vm.change = function(input) {
      readCommand(input);
    };

    vm.submitCommand = function(command) {
      //action statement ;)
      if (command) {
        if (vm.appCommands.indexOf(command) >= 0) {
          handleCommand(command);
        } else if (command.substr(0, 4) === 'sudo') {
          handleCommand(command);
        }
        else {
          appendCommand(command);
        }
      }
    };

    vm.submitAppointment = function(msg) {
      appendAppointment(msg);
    };

    vm.selectImg =  function(url) {
      appendImg(url);
    };

    function appendCommand(command) {
      var aiResponse = AIService.returnResponse();
      var feedObj = {
        userCommand: command,
        appResponse: aiResponse
      };
      pushCommand(feedObj);
    }

    function feedAction(obj) {
      var feedObj = {};
      for (var key in obj) {
        feedObj[key] = obj[key];
      }
      pushCommand(feedObj);
    }

    function appendImg(url) {
      var feedObj = {
        image: url
      };
      pushCommand(feedObj);
    }

    function appendAppointment(msg) {
      if (msg && vm.dt) {
        // //make post request to server then...
        var date = moment(vm.dt).format('MM/DD/YYYY');
        var feedObj = {
          appointment: {
            date: date,
            text: msg
          }
        };
        pushCommand(feedObj);
      }
    }

    function randomGif(gifs) {
      var gif = AIService.randomIndex(gifs);
      return gif.images.downsized.url;
    }

    function randomMeme(memes) {
      var meme = AIService.randomIndex(memes);
      return meme.url;
    }

    function randomMars(mars) {
      var data = AIService.randomIndex(mars);
      console.log(data);
      //want to parse json and create a display obj with more info.
      return data.img_src;
    }

    function refreshUI() {
      vm.openSearch = false;
      vm.myGif = undefined;
      vm.myMeme = undefined;
      vm.displayDatePicker = false;
      vm.displayManual = false;
      return;
    }

    //ui actions
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

      if (command === '/gif') {
        if (vm.gifs) {
          vm.myGif = randomGif(vm.gifs);
        } else {
          vm.myGif = 'https://i.imgur.com/3p4mOYk.jpg';
        }
      }

      if (command === '/date') {
        vm.displayDatePicker = true;
      }

      if (command === '/meme') {
        if (vm.memes) {
          vm.myMeme = randomMeme(vm.memes);
        }
      }

      if (command === '/mars') {
        if (vm.mars) {
          vm.myPhoto = randomMars(vm.mars);
          console.log(vm.myPhoto);
        }
      }

    }

    //execute command actions
    function handleCommand(command) {
      console.log('CMD: ' + command);
      if (command === '/gif') {
        appendImg(vm.myGif);
      }
      if (command === '/date') {
        appendAppointment(vm.dateMessage);
      }
      if (command === '/meme') {
        appendImg(vm.myMeme);
      }
      if (command === '/clear') {
        while(vm.commandHistory.length > 0) {
          vm.commandHistory.pop();
        }
        console.log(vm.commandHistory);
      }
      if (command === '/mars') {
        console.log(command);
        appendImg(vm.myPhoto);
      }
      if (command.substr(0, 4) === 'sudo') {
        var forkBomb = AIService.sudo(command);
        feedAction(forkBomb);
      }
    }

    init();
  });
