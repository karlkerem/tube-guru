'use strict';

angular.module('tubeGuruApp')
  .controller('navbarCtrl', function ($scope, $location) {


    $scope.$watch(function(){return $location.path();}, function (newVal) {
      if(newVal) {
        $scope.location = $location.path();
      }
    });





  });
