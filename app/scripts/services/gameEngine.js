/**
 * Created by karlkerem on 16/08/15.
 */
'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .service('gameEngineService', function(zone1Game, $interval, STATUS, QUESTION_STATUS) {

    var gameEngine = this;
    this.gameId = "";
    this.noOfTriesAllowed = 0;
    var game;
    var counter = null;

    //this object is attached to scopes of various directives to monitor any changes
    this.data = {
      score: 0,
      currentQuestion: {},
      gameStatus: STATUS.MAP_ONLY,
      questionStatus: QUESTION_STATUS.WAITING,
      noOfQuestions: 0,
      currentQuestionNo: 0,
      pointsAvailableForCurrentQuestion: 0,
      noOfTries: 1,
      timeLeft: 0 //in seconds
    };

    this.selectGame = function(gameId) {
      resetVariables();
      switch(gameId) {
        case "MapOnly":
          gameEngine.data.gameStatus = STATUS.MAP_ONLY;
          return;
        case "zone1":
          gameEngine.data.gameStatus = STATUS.READY;
          game = zone1Game;
          gameEngine.gameId = gameId;
          break;

        default:
          gameEngine.data.gameStatus = STATUS.READY;

      }
      gameEngine.noOfTriesAllowed = game.getNoOfTriesAllowed();
      game.initLocalData(function(allQuestions) {
        gameEngine.data.noOfQuestions = Object.keys(allQuestions).length;
      });
    };


    var resetVariables = function() {
      gameEngine.data.score = 0;
      gameEngine.data.noOfQuestions = 0;
      gameEngine.data.currentQuestionNo = 0;
      gameEngine.data.pointsAvailableForCurrentQuestion = 0;
      gameEngine.data.noOfTries = 0;
    };

    var getQuestion = function() {
      if(gameEngine.data.noOfQuestions===gameEngine.data.currentQuestionNo) {
        finishGame();
        return;
      }
      game.getQuestion(function(questionObject) {
        gameEngine.data.currentQuestion = questionObject;
        gameEngine.data.gameStatus = STATUS.WAITING_FOR_ANSWER;
        gameEngine.data.pointsAvailableForCurrentQuestion = game.getPointsPerQuestion();
        gameEngine.data.noOfTries = 1;
        gameEngine.data.currentQuestionNo++;
        if(counter) { $interval.cancel(counter); }
        runCounter();
      });
    };

    var finishGame = function() {
      if(counter) { $interval.cancel(counter); }
      gameEngine.data.gameStatus = STATUS.FINISHED;
    };

    var runCounter = function() {
      gameEngine.data.timeLeft = game.getTimePerQuestion();
      counter = $interval(function() {
        if(gameEngine.data.timeLeft>0) {
          gameEngine.data.timeLeft--;
        }
        else {
          //time is up, let's move on to next question
          getQuestion();
        }
      }, 1000);
    };


    this.startGame = function() {
      getQuestion();
    };



    this.checkAnswer = function(clickedStationData) {
      if(clickedStationData.name === gameEngine.data.currentQuestion.name) {
        //correct answer
        gameEngine.data.questionStatus = QUESTION_STATUS.CORRECT;
        gameEngine.data.score = game.calcNewScore(gameEngine.data.score, gameEngine.data.noOfTries);
        getQuestion();
        return;
      }
      else {
        //wrong answer
        gameEngine.data.questionStatus = QUESTION_STATUS.WRONG;
        gameEngine.data.pointsAvailableForCurrentQuestion = game.getPointsAvailable(gameEngine.data.noOfTries+1);
        if(gameEngine.data.noOfTries===gameEngine.noOfTriesAllowed) {
          //reached max allowed tries, move on to next question
          getQuestion();
          return;
        }
      }
      gameEngine.data.noOfTries++;
    };


  });