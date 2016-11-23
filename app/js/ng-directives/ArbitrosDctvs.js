/**
 * Created by tavete on 4/13/16.
 */

'use strict';
angular.module('myApp')

.directive('listadoArbitros', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/arbitros/listado-arbitros.html'
    }
})

.directive('formArbitro', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: 'templates/arbitros/form-arbitro.html'
   } 
});