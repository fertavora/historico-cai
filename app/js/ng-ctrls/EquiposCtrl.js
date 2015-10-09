'use strict';

app.controller('EquiposCtrl',
  function EquiposCtrl($scope, dataService){
    $scope.showMessageEquipoOK = false;
    $scope.equipo = {};
    $scope.master = {};

    $('#eFechaFund').datepicker({
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
      $scope.equipo.pais = $scope.paises[1];
    };

    var onCiudadesComplete =  function(response){
      $scope.ciudades = response.data;
      $scope.equipo.ciudad = $scope.ciudades[11];
    };

    var onProvinciasComplete =  function(response){
      $scope.provincias = response.data;
      $scope.equipo.provincia = $scope.provincias[4];
    };

    var onEquipoGuardado = function(response){
      $scope.equipo = angular.copy($scope.master);
      $scope.equipo.ciudad = $scope.ciudades[11];
      $scope.equipo.pais = $scope.paises[1];
      $scope.equipo.provincia = $scope.provincias[4];
      $scope.showMessageEquipoOK = true;
    };
    dataService.getPaises(onPaisesComplete, onError);
    dataService.getCiudades(onCiudadesComplete, onError);
    dataService.getProvincias(onProvinciasComplete, onError);

    $scope.submitEquipoNuevoForm = function(){
      if($scope.equipo.fecha != undefined){
        $scope.equipo.fecha = getDateDBFormat($scope.equipo.fecha);
      }else{
        $scope.equipo.fecha = null;
      }
      dataService.saveEquipo(onEquipoGuardado, onError, $scope.equipo);
    };

  });