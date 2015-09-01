'use strict';

angular.module('tubeGuruApp')
  .controller('navbarCtrl', function ($scope, $location, gameEngineService, $interval, TWEET_TEXT, STATUS) {

    $scope.tweetText = TWEET_TEXT;

    $scope.$watch(function(){return $location.path();}, function (newVal) {
      if(newVal) {
        $scope.location = $location.path();
        if(newVal!=='/game') {
          if(gameEngineService.data.counter) { $interval.cancel(gameEngineService.data.counter); }
          gameEngineService.resetVariables();
          gameEngineService.data.gameStatus = STATUS.MAP_ONLY;
        }


      }
    });


    $scope.prepHome = function() {
      if(gameEngineService.data.counter) { $interval.cancel(gameEngineService.data.counter); }
    };




  });
