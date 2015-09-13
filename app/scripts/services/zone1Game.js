'use strict';
/**
 * Created by karlkerem on 23/08/15.
 */

angular.module('tubeGuruApp')
  .service('zone1Game', function(stationDataService) {

    var dataFileName = 'data';
    var noOfTriesAllowed = 3;
    var timePerQuestion = 20; //in seconds
    var scoringMatrix = {
      1: 10, //noOfTries: points
      2: 6,
      3: 4
    };

    var questionsArray = null;


    var getRandomStation = function (questionsArray) {
      var randKey = _.random(questionsArray.length-1);
      var station = questionsArray[randKey];
      _.pullAt(questionsArray, randKey);
      return station;
    };

    var prepareZone1Questions = function(data) {
      var zone1Stations = [];

      data.tfl_stations.forEach(function(station) {
        if(_.includes(station.properties.zones, "1")) {

          var stationObject = _.find(data.map_stations, function(map_station) {
            return (map_station.name===station.properties.name && map_station.html !== "");
          });

          zone1Stations.push(stationObject);
          console.log(stationObject.name);
        }
      });

      return zone1Stations;

    };



    /* Mandatory API functions for all games */

    this.initLocalData = function(callback) {
      stationDataService.getData(dataFileName, function(data) {
        var readyQuestionsArray = prepareZone1Questions(data);
        questionsArray = readyQuestionsArray;
        if(callback){ callback(readyQuestionsArray); }
      });
    };

    this.getQuestion = function(callback) {
        callback(getRandomStation(questionsArray));
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
