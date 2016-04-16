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

// EL MODAL EN DIRECTIVE NO ANDA, APARENTEMENTE PROBLEMA ENTRE JQUERY Y ANGULARJS
// app.directive('historialEquipo', function(){
//     return {
//         restrict: 'E',
//         replace: true,
//         templateUrl: 'templates/equipos/historial-equipo.html'
//     }
// });

app.directive('listadoEquipos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/equipos/listado-equipos.html'
    }
});

