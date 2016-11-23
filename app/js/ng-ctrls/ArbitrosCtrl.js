'use strict';

angular.module('myApp')

.controller('ArbitrosCtrl',
  function ArbitrosCtrl ($scope, dataService, $interval){
      $scope.showMessageOK = false;
      $scope.arbitro = {};
      $scope.master = {};

      $('#aNacimiento').datepicker({
        language: "es",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
      });

      var onError = function(reason){
        $scope.error = "Error!";
      };

      var onPaisesComplete =  function(response){
        $scope.paises = response.data;
        $scope.arbitro.pais = $scope.paises[1];
      };

      var onArbitrosComplete = function (response){
        $scope.arbitros = response.data;
      };
      
      dataService.getPaises(onPaisesComplete, onError);
      dataService.getArbitrosOptions(onArbitrosComplete, onError);

      $scope.resetForm = function(arbitroNuevo) {
        if (arbitroNuevo) {
          arbitroNuevo.$setPristine();
          arbitroNuevo.$setUntouched();
        }
        $scope.arbitro = angular.copy($scope.master);
        $scope.arbitro.pais = $scope.paises[1];
      };

      var onArbitroGuardado = function(response){
        $scope.arbitro = angular.copy($scope.master);
        $scope.arbitro.pais = $scope.paises[1];
        $scope.showMessageOK = true;
        $scope.resetForm($scope.arbitroNuevo);
        $interval(function(){ $scope.showMessageOK = false; }, 3000);
        dataService.getArbitrosOptions(onArbitrosComplete, onError);
      }

      $scope.submitArbitroForm = function(arbitroNuevo){
        if(arbitroNuevo.$valid){
          if($scope.arbitro.fecha_nac != undefined){
            $scope.arbitro.fecha_nac = getDateDBFormat($scope.arbitro.fecha_nac);
          }else{
            $scope.arbitro.fecha_nac = null;
          }
          dataService.saveArbitro(onArbitroGuardado, onError, $scope.arbitro);
        }
      }
  });
