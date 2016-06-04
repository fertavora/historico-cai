'use strict';

app.controller('TorneosCtrl',
  function TorneosCtrl($scope, dataService, $filter, $interval){
    $scope.torneoInstancia = {};
    $scope.torneoInstancia.anio = new Date().getFullYear();
    $scope.master = {};
    $scope.showMessageInstanciaOK = false;
    $scope.showMessageTorneoOK = false;
    $scope.torneo = {};
    $scope.torneo.tipo = "N";

    var onError = function(reason){
      $scope.error = "Error!";
    };

    var onTorneosOptionsComplete = function(response){
      $scope.tipoTorneos = $filter('orderBy')(response.data, 'torneos_nombre');
      $scope.torneoInstancia.torneo = $scope.tipoTorneos[7];
    }

    var onTorneosTodos = function(response){
      $scope.torneosTodos = $filter('orderBy')(response.data, '-torneos_instancias_anio');
    }

    dataService.getTorneosOptions(onTorneosOptionsComplete, onError);

    dataService.getTorneosTodos(onTorneosTodos, onError);

    $scope.submitTorneosInstanciaNuevoForm = function(nuevoTorneoInstancia){
      if(nuevoTorneoInstancia.$valid){
        dataService.saveTorneoInstancia(onTorneoInstanciaGuardado, onError, $scope.torneoInstancia);
      }

    }

    $scope.resetFormTorneoInstancia = function(nuevoTorneoInstancia) {
      if (nuevoTorneoInstancia) {
        nuevoTorneoInstancia.$setPristine();
        nuevoTorneoInstancia.$setUntouched();
      }
      $scope.torneoInstancia = angular.copy($scope.master);
      $scope.torneoInstancia.torneo = $scope.tipoTorneos[7];
    };

    $scope.resetFormTorneo = function(nuevoTorneo) {
      if (nuevoTorneo) {
        nuevoTorneo.$setPristine();
        nuevoTorneo.$setUntouched();
      }
      $scope.torneo = angular.copy($scope.master);
      $scope.torneo.tipo = "N";
    };

    var onTorneoInstanciaGuardado = function(){
      $scope.resetFormTorneoInstancia($scope.nuevoTorneoInstancia);
      // $scope.$emit('refreshTorneos');
      $scope.showMessageInstanciaOK = true;
      $interval(function(){ $scope.showMessageInstanciaOK = false; }, 3000);
    }

    $scope.submitTorneoNuevoForm = function(nuevoTorneo){
      if(nuevoTorneo.$valid){
        dataService.saveTorneo(onTorneoGuardado, onError, $scope.torneo);
      }
    }

    $scope.btnShowHistorial = function(t){
      console.log(t);
        //reset variables
      $scope.partidosHistorial = {};
      $scope.historialJugados = 0;
      $scope.historialGanados = 0;
      $scope.historialEmpatados = 0;
      $scope.historialPerdidos = 0;
      $scope.historialGolesFavor = 0;
      $scope.historialGolesContra = 0;
      $('#historialModalLabel').text("Historial de "+$('#selectTorneos option:selected').text());
      var data = {torneos_instancias_id: t.torneos_instancias_id};
      dataService.historialTorneo(onHistorialTorneo, onError, data);
    }

    var onHistorialTorneo = function(response){
      $scope.partidosHistorial = response.data;
      angular.forEach($scope.partidosHistorial, function(item){
        if(item.partidos_goles_cai > item.partidos_goles_rival){ $scope.historialGanados++ }
        if(item.partidos_goles_cai == item.partidos_goles_rival){ $scope.historialEmpatados++ }
        if(item.partidos_goles_cai < item.partidos_goles_rival){ $scope.historialPerdidos++ }
        $scope.historialGolesFavor += item.partidos_goles_cai;
        $scope.historialGolesContra += item.partidos_goles_rival;
        $scope.historialJugados++;
      });
    }

    var onTorneoGuardado = function(){
      $scope.resetFormTorneo($scope.nuevoTorneo);
      $scope.showMessageTorneoOK = true;
      $interval(function(){ $scope.showMessageTorneoOK = false; }, 3000);
    }

    //this event is triggered at the end of the methods table ng-repeat, see directive in app.js
    $scope.$on('onRepeatLast', function(event){
      $('.btnHistorial').tooltip();
    });
  });
//todo falta el refresh de lista torneos despues de crear torneo nuevo