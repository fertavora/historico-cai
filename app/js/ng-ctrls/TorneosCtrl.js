'use strict';

app.controller('TorneosCtrl',
  function TorneosCtrl($scope, dataService){
    $scope.torneoInstancia = {};
    $scope.master = {};
    $scope.showMessageInstanciaOK = false;
    $scope.showMessageTorneoOK = false;
    $scope.torneo = {};
    $scope.torneo.tipo = "N";

    var onError = function(reason){
      $scope.error = "Error!";
    };

    var onTorneosComplete = function(response){
      $scope.tipoTorneos = response.data;
      $scope.torneoInstancia.torneo = $scope.tipoTorneos[7];
    }

    dataService.getTorneosOptions(onTorneosComplete, onError);

    $scope.submitTorneosInstanciaNuevoForm = function(){
      dataService.saveTorneoInstancia(onTorneoInstanciaGuardado, onError, $scope.torneoInstancia);
      // console.log($scope.torneoInstancia);
    }

    var onTorneoInstanciaGuardado = function(){
      $scope.torneoInstancia = angular.copy($scope.master); //this is to reset form and object partido
      $scope.torneoInstancia.torneo = $scope.tipoTorneos[7];
      $scope.showMessageInstanciaOK = true;
    }

    $scope.submitTorneoNuevoForm = function(){
      dataService.saveTorneo(onTorneoGuardado, onError, $scope.torneo);
    }

    var onTorneoGuardado = function(){
      $scope.torneo = angular.copy($scope.master);
      $scope.torneo.tipo = "N";
      $scope.showMessageTorneoOK = true;
    }
  });