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

    this.findStation = function(stationId, callback){
      that.getData('data', function(data) {
        if(data.map_stations[stationId]) {
          callback(data.map_stations[stationId]);
        }
        else {
          callback("");
        }
      });

    };


  });
