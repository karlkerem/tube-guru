'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .service('mapClicksService', function() {

  this.getStationId = function(event) {
    //station name was clicked
    if(event.target.nodeName === "STRONG" && event.target.parentNode.nodeName==="LI") {
      return event.target.parentNode.id;
    }
    //something else was clicked
    return "";
  };


});
