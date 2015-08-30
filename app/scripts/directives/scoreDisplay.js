'use strict';
/**
 * Created by karlkerem on 29/08/15.
 */

angular.module('tubeGuruApp')
  .directive('scoreDisplay', function(gameEngineService) {
    return {
      scope: {
      },
      link: function(scope) {
        scope.gameEngine = gameEngineService.data;

      },
      templateUrl: "templates/scoreDisplay.html"
    };
  });
