'use strict';

/**
 * @ngdoc overview
 * @name nudgerApp
 * @description
 * # nudgerApp
 *
 * Main module of the application.
 */
var app = angular
  .module('nudgerApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.directive('myEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.myEnter);
        });
      event.preventDefault();
      }
    });
  };
});

app.directive('feedScroll', function () {
  return {
    scope: {
      feedScroll: '='
    },
    link: function (scope, element) {
      scope.$watchCollection('feedScroll', function (newValue) {
        if (newValue) {
          (element).scrollTop((element)[0].scrollHeight);
        }
      });
    }
  };
});
