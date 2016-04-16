/**
 * Created by tavete on 4/15/16.
 */

'use strict';

app.directive('ultimosPartidos', function(){
   return {
       restrict: 'E',
       replace: true,
       templateUrl: 'templates/ultimos-partidos.html'
   }

});

app.directive('partidoNuevo', function(){
   return{
       restrict: 'E',
       replace: true,
       templateUrl: 'templates/partido-nuevo.html'
   } 
});