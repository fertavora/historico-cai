'use strict';

app.controller('HomeCtrl',
  function HomeCtrl($scope, dataService, $locale){
    $locale.id = "es-AR";

    var onPartidosComplete = function(response){
      $scope.partidos = response.data;
    }

    var onError = function(reason){
      $scope.error = "Error!";
    };

    //this event is to refresh the partidos list, triggered at PartidoNuevoCtrl.$scope.$emit('refreshPartidos');
    $scope.$on('refreshPartidos', function(event){
      dataService.getPartidosHome(onPartidosComplete, onError);
    });

    dataService.getPartidosHome(onPartidosComplete, onError);
  });
