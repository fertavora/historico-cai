'use strict';

app.controller('TecnicosCtrl',
  function TecnicosCtrl($scope, dataService){
    $scope.showMessageOK = false;
    $scope.tecnico = {};
    $scope.master = {};
    $scope.tecnico.activo = 1;
    $scope.tecnicos = [];

    $('#tNacimiento').datepicker({
      language: "es",
      todayBtn: "linked",
      autoclose: true,
      todayHighlight: true
    });

    var getDateDBFormat = function(str){
      var y = str.slice(6,10);
      var m = str.slice(3,5);
      var d = str.slice(0,2);
      return y+"-"+m+"-"+d;
    }

    var onError = function(reason){
      $scope.error = "Error!";
    };

    var onPaisesComplete =  function(response){
      $scope.paises = response.data;
      $scope.tecnico.pais = $scope.paises[1];
      $scope.tecnico.activo = 1;
      $scope.tecnico.fecha_nac = undefined;
    };
    var onAllTecnicosComplete = function(response){
      $scope.tecnicos = response.data;
    }

    dataService.getPaises(onPaisesComplete, onError);
    dataService.getAllTecnicos(onAllTecnicosComplete, onError);

    var onTecnicoGuardado = function(response){
      $scope.tecnico = angular.copy($scope.master);
      $scope.tecnico.pais = $scope.paises[1];
      $scope.showMessageOK = true;
    }

    $scope.submitTecnicoForm = function(){
      // console.log($scope.tecnico);
      if($scope.tecnico.fecha_nac != undefined){
        $scope.tecnico.fecha_nac = getDateDBFormat($scope.tecnico.fecha_nac);
      }else{
        $scope.tecnico.fecha_nac = null;
      }
      dataService.saveTecnico(onTecnicoGuardado, onError, $scope.tecnico);
    }
  });
