'use strict';

/**
 * @ngdoc function
 * @name nudgerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nudgerApp
 */
angular.module('nudgerApp')
  .controller('MainCtrl', function ($http, GifService, AIService, MemeService, NasaService, ScService) {
    var vm = this;
    //command ui
    vm.command = '';
    vm.appCommands = ['/', '/gif', '/date', '/meme', '/clear', '/mars', '/lorem', '/nasa'];
    vm.commandHistory = [];
    vm.mainFeed = [{
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
      getNasa();
    }

    function pushCommand(obj) {
      vm.mainFeed.push(obj);
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

    function getNasa() {
      getMars();
      getAsteroids();
      getApod();
    }

    function getMars() {
      NasaService.mars().then(function(data){
        vm.loading = false;
        vm.mars = data.photos;
      });
    }

    function getAsteroids() {
      NasaService.asteroids().then(function(data) {
        vm.asteroids = data;
      });
    }

    function getApod() {
      NasaService.apod().then(function(data) {
        vm.apod = data;
      });
    }

    vm.change = function(input) {
      readCommand(input);
    };

    vm.submitCommand = function(command) {
      //action statement ;)
      if (command) {
        vm.commandHistory.push(command);
        if (vm.appCommands.indexOf(command) >= 0) {
          handleCommand(command);
        } else if (command.substr(0, 4) === 'sudo') {
          handleCommand(command);
        } else if (command.substr(0, 5) === '/nasa') {
          handleCommand(command);
        } else if (command.substr(0, 3) === '/sc') {
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
      //parse json and create a display obj with more info.
      return data.img_src;
    }

    function refreshUI() {
      vm.openSearch = false;
      vm.myGif = undefined;
      vm.myMeme = undefined;
      vm.myPhoto = undefined;
      vm.displayDatePicker = false;
      vm.displayManual = false;
      return;
    }

    //ui actions
    function readCommand(cmd) {
      if (vm.appCommands.indexOf(cmd) < 0) {
        refreshUI();
      }
      switch(cmd) {
        case '/': {
          vm.openSearch = true;
          vm.displayManual = true;
          }
        break;
        case '/gif': {
          if (vm.gifs) {
            vm.myGif = randomGif(vm.gifs);
          } else {
            vm.myGif = 'https://i.imgur.com/3p4mOYk.jpg';
          }
        }
        break;
        case '/date': {
          vm.displayDatePicker = true;
        }
        break;
        case '/meme': {
          if (vm.memes) {
            vm.myMeme = randomMeme(vm.memes);
          }
        }
        break;
        case '/mars': {
          if (vm.mars) {
            vm.myPhoto = randomMars(vm.mars);
          }
        }
        break;
        default: return;
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
        while(vm.mainFeed.length > 0) {
          vm.mainFeed.pop();
        }
        clearCommand();
      }
      if (command === '/mars') {
        appendImg(vm.myPhoto);
      }
      if (command.substr(0, 4) === 'sudo') {
        var forkBomb = AIService.sudo(command);
        feedAction(forkBomb);
      }
      if (command === '/lorem') {
        var lorem = AIService.lorem();
        pushCommand(lorem);
      }
      if (command.substr(0, 5) === '/nasa') {
        handleNasa(command);
      }
      if (command.substr(0,3) === '/sc') {
        handleSC(command);
      }
    }

    function handleSC(command) {
      var query = command.split('-');
      var key = query[1];
      console.log(key);
      ScService.artistTrack().then(function(res) {
        var tracks = res;
        var track = AIService.randomIndex(tracks);
        var src = ScService.embedLink(track.id);
        console.log(src);
        appendSC(src);
      }, function(err) {
        //no artist on file error msg
        console.log(err);
      });
    }

    function appendSC(data) {
      var feedObj = {
        soundCloud: data
      };
      pushCommand(feedObj);
    }

    function handleNasa(command) {
      var query = command.split('-');
      var key = query[1];
      if (key) {
        //do something with query
        if (key === 'mars') {
          vm.myPhoto = randomMars(vm.mars);
          appendImg(vm.myPhoto);
        }
        if (key === 'asteroids') {
          appendAsteroids(vm.asteroids, command);
        }
        if (key === 'apod') {
          appendImg(vm.apod.url);
          appendApod(vm.apod);
        }
      } else {
        // no args - show instructions
      }
    }

    function appendApod(data) {
      var feedObj = {
        appResponse: data.explanation
      };
      pushCommand(feedObj);
    }

    function appendAsteroids(data, command) {
      var feedObj = NasaService.readAsteroid(data, command);
      pushCommand(feedObj);
    }

    init();
  });
