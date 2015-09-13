'use strict';
/**
 * Created by karlkerem on 15/08/15.
 */

angular.module('tubeGuruApp')
  .directive('mapWrapper', function(mapClicksService, stationDataService, gameEngineService, STATUS) {


    function link(scope) {

      angular.element(".rail").append("<ul class='rail-symbol'><li class='hor'></li><li class='hor2'></li><li class='diag'></li><li class='diag2'></li><li class='diag3'></li></ul>");
      angular.element(".disabled").append("<ul class='disabled-symbol'><li class='wheel'></li><li class='legs'></li><li class='arms'></li><li class='thighs'></li><li class='back'></li></ul>");
      angular.element(".boat").append("<ul class='boat-symbol'><li class='hull'></li><li class='cabin'></li><li class='top'></li><li class='window'></li><li class='window1'></li><li class='window2'></li><li class='window3'></li><li class='wave'></li><li class='wave2'></li><li class='bwave'></li><li class='bwave2'></li><li class='bwave3'></li></ul>");
      angular.element(".tram").append("<ul class='tram-symbol'><li class='carriage'></li><li class='door1'></li><li class='door2'></li><li class='window1'></li><li class='window2'></li><li class='window3'></li><li class='window4'></li><li class='conductor'></li><li class='wheel1'></li><li class='wheel2'></li><li class='wheel3'></li><li class='wheel4'></li></ul>");
      angular.element(".plane").append("<ul class='plane-symbol'><li class='fuselage'></li><li class='tail'></li><li class='wing1'></li><li class='wing2'></li></ul>");
      angular.element(".cross").append("<ul class='cross-symbol'><li class='hor'></li><li class='vert'></li></ul>");

      scope.gameEngine = gameEngineService.data;
      scope.STATUS = STATUS;

      scope.$watch(function(){return gameEngineService.data.previousQuestion;}, function(newVal) {
        if(newVal) {
          var elementKey = "#"+gameEngineService.data.previousQuestion.key+" strong";
          angular.element(elementKey).html(gameEngineService.data.previousQuestion.html);
        }
      });


      /* Zooming */
      var panzoom = $("#scaled-map-frame").panzoom({
        startTransform: 'matrix(0.5, 0, 0, 0.5, -689, -1025)',
        minScale: 0.3
      });


      panzoom.parent().on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        panzoom.panzoom('zoom', zoomOut, {
          increment: 0.1,
          animate: false,
          focal: e
        });
      });

      scope.zoomIn = function(){
        panzoom.panzoom("zoom", false, {
          focal: {
            increment: 0.3,
            clientX: 1025,
            clientY: 689
          }
        });

      };


      scope.zoomInDblClick = function(e) {
        panzoom.panzoom("zoom", false, {
          increment: 0.3,
          focal: e
        });
      };

      scope.zoomOut = function() {
        panzoom.panzoom("zoom", true, {
          focal: {
            increment: 0.3,
            clientX: 1025,
            clientY: 689
          }
        });
      };



      /* Clicking on stations */
      scope.clickStation = function(event) {
        var id = mapClicksService.getStationId(event);

        if(id && gameEngineService.data.gameStatus===STATUS.WAITING_FOR_ANSWER) {
          stationDataService.findStation(id, function(stationData) {
            gameEngineService.checkAnswer(stationData);
          });
        }

      };

    }

    return {
      link: link,
      restrict: 'E',
      templateUrl: 'templates/mapWrapper.html'
    };
  });
