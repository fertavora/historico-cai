/**
 * Created by tavete on 4/14/16.
 */
'use strict';

app.directive('formEquipo', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/form-equipo.html'
    }
});

app.directive('listadoEquipos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/listado-equipos.html'
    }
})