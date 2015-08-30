'use strict';

angular.module('tubeGuruApp')
  .controller('finishedModalCtrl', function ($scope, $modalInstance, gameEngine, gameName) {


    $scope.gameName = gameName;
    $scope.gameEngine = gameEngine;

    $scope.close = function() {
      $modalInstance.close();
    };

  });
