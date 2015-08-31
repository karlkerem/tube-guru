'use strict';

angular.module('tubeGuruApp')
  .controller('navbarCtrl', function ($scope, $location, gameEngineService, $interval) {


    $scope.$watch(function(){return $location.path();}, function (newVal) {
      if(newVal) {
        $scope.location = $location.path();
      }
    });


    $scope.cancelCounter = function() {
      if(gameEngineService.data.counter) { $interval.cancel(gameEngineService.data.counter); }
    };




  });
