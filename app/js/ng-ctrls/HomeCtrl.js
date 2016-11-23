'use strict';

angular.module('myApp')

  .controller('HomeCtrl',
    function HomeCtrl($scope, dataService, $locale){
      $locale.id = "es-AR";
  
      $scope.limits = [{value: '10'},{value: '20'},{value: '30'}];
      $scope.limitPartidos = $scope.limits[0];
      var onPartidosComplete = function(response){
        $scope.partidos = response.data;
      };
  
      var onError = function(reason){
        $scope.error = "Error!";
      };
  
      //this event is to refresh the partidos list, triggered at PartidoNuevoCtrl.$scope.$emit('refreshPartidos');
      $scope.$on('refreshPartidos', function(){
        dataService.getPartidosHome(onPartidosComplete, onError);
      });
  
      dataService.getPartidosHome(onPartidosComplete, onError);
  
      $scope.btnShowDetalle = function(p){
          console.log(p);
      }
    });
