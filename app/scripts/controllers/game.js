'use strict';

/**
 * @ngdoc function
 * @name tubeGuruApp.controller:GameCtrl
 * @description
 * # MainCtrl
 * Controller of the tubeGuruApp
 */
angular.module('tubeGuruApp')
  .controller('GameCtrl', function (gameEngineService, $scope, STATUS) {

        $scope.gameEngine = gameEngineService.data;
        $scope.STATUS = STATUS;

  });
