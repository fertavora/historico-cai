/**
 * Created by tavete on 4/13/16.
 */

'use strict';

app.directive('listadoArbitros', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/arbitros/listado-arbitros.html'
    }
});

app.directive('formArbitro', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: 'templates/arbitros/form-arbitro.html'
   } 
});