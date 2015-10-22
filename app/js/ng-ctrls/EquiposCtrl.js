'use strict';

app.controller('EquiposCtrl',
  function EquiposCtrl($scope, dataService){
    $scope.showMessageEquipoOK = false;
    $scope.equipo = {};
    $scope.master = {};
    $scope.partidosHistorial = {};
    $scope.historialJugados = 0;
    $scope.historialGanados = 0;
    $scope.historialEmpatados = 0;
    $scope.historialPerdidos = 0;
    $scope.historialGolesFavor = 0;
    $scope.historialGolesContra = 0;

    //this event is triggered at the end of the methods table ng-repeat, see directive in app.js
    $scope.$on('onRepeatLast', function(event){
      $('.btnHistorial').tooltip();
    });

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

    var onEquiposComplete = function(response){
      $scope.equipos = response.data;
    }

    var onHistorialEquipo = function(response){
      $scope.partidosHistorial = response.data;
      angular.forEach($scope.partidosHistorial, function(item){
        if(item.partidos_goles_cai > item.partidos_goles_rival){ $scope.historialGanados++ }
        if(item.partidos_goles_cai == item.partidos_goles_rival){ $scope.historialEmpatados++ }
        if(item.partidos_goles_cai < item.partidos_goles_rival){ $scope.historialPerdidos++ }
        $scope.historialGolesFavor += item.partidos_goles_cai;
        $scope.historialGolesContra += item.partidos_goles_rival;
        $scope.historialJugados++;
      });

      console.log("Jugados: " + $scope.historialJugados);
      console.log("Ganados: " + $scope.historialGanados);
      console.log("Empatados: " + $scope.historialEmpatados);
      console.log("Perdidos: " + $scope.historialPerdidos);
      console.log("GolesFavor: " + $scope.historialGolesFavor);
      console.log("GolesContra: " + $scope.historialGolesContra);
    }

    dataService.getPaises(onPaisesComplete, onError);
    dataService.getCiudades(onCiudadesComplete, onError);
    dataService.getProvincias(onProvinciasComplete, onError);
    dataService.getEquiposOptions(onEquiposComplete, onError);

    $scope.submitEquipoNuevoForm = function(){
      if($scope.equipo.fecha != undefined){
        $scope.equipo.fecha = getDateDBFormat($scope.equipo.fecha);
      }else{
        $scope.equipo.fecha = null;
      }
      dataService.saveEquipo(onEquipoGuardado, onError, $scope.equipo);
    };

    $scope.btnShowHistorial = function(e){
      //reset variables
      $scope.partidosHistorial = {};
      $scope.historialJugados = 0;
      $scope.historialGanados = 0;
      $scope.historialEmpatados = 0;
      $scope.historialPerdidos = 0;
      $scope.historialGolesFavor = 0;
      $scope.historialGolesContra = 0;

      var data = {equipos_id: e.equipos_id};
      dataService.historialEquipo(onHistorialEquipo, onError, data);
    }

  });
