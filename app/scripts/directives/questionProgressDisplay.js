'use strict';
/**
 * Created by karlkerem on 29/08/15.
 */

angular.module('tubeGuruApp')
  .directive('questionProgressDisplay', function(gameEngineService) {
    return {
      scope: {},
      link: function(scope) {
        scope.gameEngine = gameEngineService.data;

        scope.$watch(function(){return gameEngineService.data.currentQuestionNo;}, function() {
          var newWidth = ((gameEngineService.data.currentQuestionNo)*100)/gameEngineService.data.noOfQuestions;
          angular.element("#question-progress-bar").css({ "width": newWidth+"%"});
        });

      },
      templateUrl: "templates/questionProgressDisplay.html"
    };
  });
