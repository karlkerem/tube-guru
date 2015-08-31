'use strict';
/**
 * Created by karlkerem on 23/08/15.
 */

angular.module('tubeGuruApp')
  .service('zone1Game', function(stationDataService) {

    var dataFileName = 'zone1';
    var noOfTriesAllowed = 3;
    var timePerQuestion = 20; //in seconds
    var scoringMatrix = {
      1: 10, //noOfTries: points
      2: 6,
      3: 4
    };

    var localData = null;


    var getRandomStation = function (stationsObj) {
      var keys = Object.keys(stationsObj);
      var randKey = keys[ keys.length * Math.random() << 0];
      var station = stationsObj[randKey];
      delete stationsObj[randKey];
      return station;
    };



    /* Mandatory API functions for all games */

    this.initLocalData = function(callback) {
      stationDataService.getData(dataFileName, function(data) {
        localData = data.stations;
        if(callback){ callback(data.stations); }
      });
    };

    this.getQuestion = function(callback) {
        callback(getRandomStation(localData));
    };


    this.getPointsPerQuestion = function() {
      return scoringMatrix[1];
    };

    this.getNoOfTriesAllowed = function() {
      return noOfTriesAllowed;
    };

    this.calcNewScore = function(oldScore, noOfTries) {
      if(scoringMatrix[noOfTries]) {
        return oldScore + scoringMatrix[noOfTries];
      }
      return oldScore;
    };

    this.getPointsAvailable = function(noOfTries) {
      if(scoringMatrix[noOfTries]) {
        return scoringMatrix[noOfTries];
      }
      return 0;
    };

    this.getTimePerQuestion = function() {
      return timePerQuestion;
    };


    /* End of Mandatory API functions */

  });
