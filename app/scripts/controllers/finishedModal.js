'use strict';

angular.module('tubeGuruApp')
  .controller('finishedModalCtrl', function ($scope, $modalInstance, gameEngine, gameName, $location) {


    $scope.gameName = gameName;
    $scope.gameEngine = gameEngine;

    $scope.close = function() {
      $modalInstance.close();
      $location.url('/');

    };

  });
