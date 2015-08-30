'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .directive('gamePanel', function(gameEngineService, stationDataService, STATUS, QUESTION_STATUS, $timeout, $modal) {

    function link(scope) {

      scope.incorrectAnswer = false;
      scope.correctAnswer = false;
      scope.question = "";
      scope.STATUS = STATUS;
      scope.QUESTION_STATUS = QUESTION_STATUS;
      scope.gameEngine = gameEngineService.data;

      scope.start = function() {
        gameEngineService.startGame();
      };

      scope.gameEngine = gameEngineService.data;

      stationDataService.getData(gameEngineService.gameId, function(data) {
        scope.firstLineInstructions = data.instructions.firstLine;
        scope.secondLineInstructions = data.instructions.secondLine;
      });


      scope.$watch(function(){return gameEngineService.data.questionStatus;}, function (newVal) {
        if(newVal!==QUESTION_STATUS.WAITING) {
          $timeout(function() {
            gameEngineService.data.questionStatus = QUESTION_STATUS.WAITING;
            scope.$apply();
          }, 800);
        }
      });

      scope.$watch(function(){return gameEngineService.data.gameStatus;}, function (newVal) {
        if(newVal===STATUS.FINISHED) {
          showFinihsedModal();
        }
      });

      var showFinihsedModal = function() {
        $modal.open({
          templateUrl: 'templates/finishedModal.html',
          controller: 'finishedModalCtrl',
          size: 'md',
          resolve: {
            gameEngine: function () {
              return gameEngineService.data;
            },
            gameName: function () {
              return scope.firstLineInstructions;
            }
          }
        });
      };


    }

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'templates/gamePanel.html'
    };
  });
