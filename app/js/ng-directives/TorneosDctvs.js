/**
 * Created by tavete on 4/18/16.
 */

'use strict';

app.directive('listadoTorneos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/torneos/listado-torneos.html'
    }
});

app.directive('formTorneos', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/templates/torneos/form-torneos.html'
    }
});