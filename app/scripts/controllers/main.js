'use strict';

/**
 * @ngdoc function
 * @name tubeGuruApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tubeGuruApp
 */
angular.module('tubeGuruApp')
  .controller('MainCtrl', function ($scope, gameEngineService, stationDataService, TWEET_TEXT, $location) {
    $scope.start = 'startButton';

    $scope.tweetText = TWEET_TEXT;
    $scope.selectGame = function(gameId) {
      $scope.gameId = gameId;

      if(gameId==='MapOnly') {
        gameEngineService.selectGame(gameId, 0);
        $location.url('/game');
      }
      else {
        stationDataService.getData(gameId, function(data) {
          $scope.noOfStationsOptions = data.noOfStationsOptions;
          $scope.gameName = data.instructions.firstLine;
          $scope.start = 'secondPage';
        });
      }
    };

    $scope.selectNoOfStationsOptions = function(noOfStations) {
      gameEngineService.selectGame($scope.gameId, noOfStations);
      $location.url('/game');
    };


  });
