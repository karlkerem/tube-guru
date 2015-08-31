'use strict';

/**
 * @ngdoc overview
 * @name tubeGuruApp
 * @description
 * # tubeGuruApp
 *
 * Main module of the application.
 */
angular
  .module('tubeGuruApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angulartics',
    'angulartics.google.analytics'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .constant('STATUS', {
    'READY': 'ready',
    'MAP_ONLY': 'mapOnly',
    'WAITING_FOR_ANSWER': 'waitingForAnswer',
    'FINISHED': 'finished'
  })
  .constant('QUESTION_STATUS', {
    'WAITING': 'waiting',
    'CORRECT': 'correct',
    'WRONG': 'wrong'
  });
