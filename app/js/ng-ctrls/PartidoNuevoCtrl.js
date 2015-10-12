'use strict';

app.controller('PartidoNuevoCtrl',
  function PartidoNuevoCtrl($scope, dataService, $filter, $http){
    $scope.master = {};
    $scope.showMessageOK = false;

    var onError = function(reason){
      $scope.error = "Error!";
    };

    var onEquiposComplete = function(response){
      $scope.equipos = response.data;
      $scope.partido.equipo = $scope.equipos[0];
    }

    var onTorneosComplete = function(response){
      $scope.torneos = response.data;
      $scope.partido.torneo = $scope.torneos[0];
    }

    var onArbitrosComplete = function(response){
      $scope.arbitros = response.data;
      $scope.partido.arbitro = $scope.arbitros[0];
    }

    var onTecnicoComplete = function(response){
      $scope.tecnicos = response.data;
      $scope.partido.tecnico = $scope.tecnicos[0];
    }

    var getDateDBFormat = function(str){
      var y = str.slice(6,10);
      var m = str.slice(3,5);
      var d = str.slice(0,2);
      return y+"-"+m+"-"+d;
    }


    dataService.getEquiposOptions(onEquiposComplete, onError);
    dataService.getCurrentTorneosOptions(onTorneosComplete, onError);
    dataService.getArbitrosOptions(onArbitrosComplete, onError);
    dataService.getCurrentTecnico(onTecnicoComplete, onError);

    $('#diaPartido').datepicker({
      language: "es",
      todayBtn: "linked",
      autoclose: true,
      todayHighlight: true
    });

    $scope.submitPartidoNuevoForm = function(){
      $scope.showMessageOK = false; //to hide message if submited before
      $scope.partido.dia = getDateDBFormat($scope.partido.dia);
      dataService.savePartido(onPartidoGuardado, onError, $scope.partido);
    };

    var onPartidoGuardado = function(response){
      $scope.partido = angular.copy($scope.master); //this is to reset form and object partido
      $scope.showMessageOK = true;
      $scope.partido.tecnico = $scope.tecnicos[0];
      $scope.partido.arbitro = $scope.arbitros[0];
      $scope.partido.equipo = $scope.equipos[0];
      $scope.partido.torneo = $scope.torneos[0];
      $scope.partido.condicion='L';
      $scope.partido.golescai=0;
      $scope.partido.golesrival=0;
      $scope.$emit('refreshPartidos');
      setTimeout(function(){ $scope.showMessageOK = false; }, 3000);
    }
  });
