/**
 * Created by tavete on 4/14/16.
 */
'use strict';
angular.module('myApp')

.directive('formEquipo', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/form-equipo.html'
    }
})

.directive('historialEquipo', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/historial-equipo.html',
    }
})

.directive('listadoEquipos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/listado-equipos.html'
    }
});

