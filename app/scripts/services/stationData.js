'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .service('stationDataService', function($http) {
    var that = this;

    this.getData = function(gameId, callback) {
        $http({
          method: 'GET',
          url: 'data/'+gameId+'.json',
          cache: true
        }).success(callback);
    };

    this.findStation = function(gameId, stationId, callback){
      that.getData(gameId, function(data) {
        if(data.stations[stationId]) {
          callback(data.stations[stationId]);
        }
        else {
          callback("");
        }
      });

    };


  });
