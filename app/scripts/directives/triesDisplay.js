'use strict';
/**
 * Created by karlkerem on 29/08/15.
 */

angular.module('tubeGuruApp')
  .directive('triesDisplay', function(gameEngineService) {
    return {
      scope: {},
      link: function(scope) {
        scope.noOfTriesAllowed = gameEngineService.noOfTriesAllowed;
        scope.gameEngine = gameEngineService.data;
      },
      templateUrl: "templates/triesDisplay.html"
    };
  });
