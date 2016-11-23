/**
 * Created by tavete on 4/13/16.
 */

'use strict';
angular.module('myApp')

.directive('listadoTecnicos', function(){
    return{
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/tecnicos/listado-tecnicos.html'
    }
})

.directive('formTecnico', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: '/templates/tecnicos/form-tecnico.html'
   } 
});