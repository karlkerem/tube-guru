'use strict';

/**
 * @ngdoc function
 * @name tubeGuruApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tubeGuruApp
 */
angular.module('tubeGuruApp')
  .controller('MainCtrl', function ($scope, gameEngineService) {

    $scope.selectGame = function(gameId) {
      gameEngineService.selectGame(gameId);
    };



  });
