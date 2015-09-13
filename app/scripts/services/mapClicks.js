'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .service('mapClicksService', function() {

  this.getStationId = function(event) {
    //station name was clicked
    if((event.target.nodeName === "STRONG" && event.target.parentNode.nodeName==="LI") ||
        event.target.className === "station-button" ||
        event.target.className === "station-button-vertical" ||
        event.target.className === "disabled-symbol"
    ) {
      return event.target.parentNode.id;
    }
    else if(event.target.className === "roundel connection") {
      return event.target.id;
    }
    else if(event.target.className === "wheel" ||
            event.target.className === "legs" ||
            event.target.className === "arms" ||
            event.target.className === "things" ||
            event.target.className === "back"
    ) {
      return event.target.parentNode.parentNode.id;
    }

    //something else was clicked
    return "";
  };


});

