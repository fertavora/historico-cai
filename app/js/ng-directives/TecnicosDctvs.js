/**
 * Created by tavete on 4/13/16.
 */

'use strict';

app.directive('listadoTecnicos', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/listado-tecnicos.html'
    }
});

app.directive('formTecnico', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: '/templates/form-tecnico.html'
   } 
});