'use strict';

/**
 * @ngdoc function
 * @name tubeGuruApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tubeGuruApp
 */
angular.module('tubeGuruApp')
  .controller('MainCtrl', function ($scope, gameEngineService, stationDataService, TWEET_TEXT, $location) {
    $scope.start = 'startButton';
    $scope.tweetText = TWEET_TEXT;
    var noOfStationsPerZone = {};
    $scope.maxAvailableStations = 0;

    $scope.zones = [
      {number:"1",
      selected: false},
      {number:"2",
      selected: false},
      {number:"3",
      selected: false},
      {number:"4",
      selected: false},
      {number:"5",
      selected: false},
      {number:"6",
      selected: false},
      {number:"7",
      selected: false},
      {number:"8",
      selected: false}
    ];

    var stationOptions = [
      {
        "number": 10,
        "title": "10"
      },
      {
        "number": 20,
        "title": "20"
      },
      {
        "number": 30,
        "title": "30"
      },
      {
        "number": 40,
        "title": "40"
      },
      {
        "number": 50,
        "title": "50"
      }
    ];

    $scope.areAnyZonesSelected = function() {
      for(var i=0; i<$scope.zones.length; i++) {
        if($scope.zones[i].selected) {
          return true;
        }
      }
      return false;
    };




    $scope.selectGame = function(gameId) {
      $scope.gameId = gameId;

      if(gameId==='MapOnly') {
        gameEngineService.selectGame(gameId, 0);
        $location.url('/game');
      }
      else {
        stationDataService.getData(gameId, function(data) {
          noOfStationsPerZone = data.noOfStationsPerZone;
          $scope.gameName = data.instructions.firstLine;
          $scope.start = 'secondPage';
        });
      }
    };


    $scope.continueFromZonesPage = function() {
      $scope.start = 'thirdPage';
      $scope.maxAvailableStations = countAvailableStations($scope.zones, noOfStationsPerZone);
      $scope.noOfStationsOptions = calcNoOfStationsOptions($scope.maxAvailableStations, stationOptions);
    };

    $scope.selectNoOfStationsOptions = function(noOfStations) {
      var selectedZones = removeNotSelectedZones($scope.zones);
      gameEngineService.selectGame($scope.gameId, noOfStations, selectedZones);
      $location.url('/game');
    };


    var removeNotSelectedZones = function(zones) {
      var newArray = [];
      for(var i=0; i<zones.length; i++) {
        if(zones[i].selected) {
          newArray.push(zones[i]);
        }
      }
      return newArray;
    };

    var countAvailableStations = function(zones, noOfStationsPerZone) {
      var newCount = 0;
      zones.forEach(function(zone) {
        if(zone.selected) {
          newCount += noOfStationsPerZone[zone.number];
        }
      });
      return newCount;
    };

    var calcNoOfStationsOptions = function(maxAvailable, stationOptionsTemplate) {
      var newStationOptions = [];
      stationOptionsTemplate.forEach(function(option) {
        if(option.number<=maxAvailable) {
          newStationOptions.push(option);
        }
      });
      newStationOptions.push({
        "number": maxAvailable.toString(),
        "title": "All ("+maxAvailable+")"
      });
      return newStationOptions;
    };

  });
