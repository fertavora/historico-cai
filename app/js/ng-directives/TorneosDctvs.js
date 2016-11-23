/**
 * Created by tavete on 4/18/16.
 */

'use strict';
angular.module('myApp')

.directive('listadoTorneos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/torneos/listado-torneos.html'
    }
})

.directive('formTorneos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/torneos/form-torneos.html'
    }
});