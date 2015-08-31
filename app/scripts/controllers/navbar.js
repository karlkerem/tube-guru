'use strict';

angular.module('tubeGuruApp')
  .controller('navbarCtrl', function ($scope, $location, gameEngineService, $interval, TWEET_TEXT) {

    $scope.tweetText = TWEET_TEXT;

    $scope.$watch(function(){return $location.path();}, function (newVal) {
      if(newVal) {
        $scope.location = $location.path();
      }
    });


    $scope.prepHome = function() {
      if(gameEngineService.data.counter) { $interval.cancel(gameEngineService.data.counter); }
    };




  });
