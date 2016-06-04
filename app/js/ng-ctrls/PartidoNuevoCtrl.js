'use strict';

app.controller('PartidoNuevoCtrl',
  function PartidoNuevoCtrl($scope, dataService, $interval, $filter){
    $scope.master = {};
    $scope.showMessageOK = false;
    $scope.partido = {};

    var onError = function(reason){
      console.log(reason);
      $scope.error = "Error!";
    };

    var onEquiposComplete = function(response){
      $scope.equipos = $filter('orderBy')(response.data, 'equipos_nombre');
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
      $scope.tecnicos = $filter('filter')(response.data, {tecnicos_activo:1});
      // filter:{tecnicos_activo:1}
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

    $scope.resetForm = function(formPartidoNuevo){
        if(formPartidoNuevo){
            formPartidoNuevo.$setPristine();
            formPartidoNuevo.$setUntouched();
        }
        $scope.partido = angular.copy($scope.master);
        $scope.partido.equipo = $scope.equipos[0];
        $scope.partido.torneo = $scope.torneos[0];
        $scope.partido.arbitro = $scope.arbitros[0];
        $scope.partido.tecnico = $scope.tecnicos[0];
        $scope.partido.golescai = 0;
        $scope.partido.golesrival = 0;
        $scope.partido.condicion = 'L';
    }

    $scope.submitPartidoNuevoForm = function(p, formPartidoNuevo){
        if(formPartidoNuevo.$valid){
            $scope.showMessageOK = false; //to hide message if submited before
            p.dia = getDateDBFormat(p.dia);
            dataService.savePartido(onPartidoGuardado, onError, p);
        }
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
      $scope.resetForm($scope.formPartidoNuevo);
      $interval(function(){ $scope.showMessageOK = false; }, 3000);
    }
  });
