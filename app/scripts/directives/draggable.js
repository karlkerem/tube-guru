'use strict';
/**
 * Created by karlkerem on 16/08/15.
 */

angular.module('tubeGuruApp')
  .directive('draggable', ['$document', function($document) {
    return {
      scope: {
        zoomLevel: "@zoomLevel"
      },
      link: function(scope, element) {
        var startX = 0, startY = 0, x = 0, y = 0;

        element.css({
          position: 'relative'
        });

        element.on('mousedown', function(event) {
          event.preventDefault();
          startX = (event.pageX - (x*scope.zoomLevel));
          startY = (event.pageY - (y*scope.zoomLevel));
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
          element.css({
            cursor: 'move'
          });
        });

        function mousemove(event) {
          event.preventDefault();
          y = (event.pageY - startY) / scope.zoomLevel;
          x = (event.pageX - startX) / scope.zoomLevel;
          element.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }

        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
          element.css({
            cursor: 'default'
          });
        }
      }
    };
  }]);
