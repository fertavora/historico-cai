'use strict';

var app = angular.module('myApp', ['ngRoute'])
  .directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast');
            }, 1);
        };
  })
  .config(function($routeProvider){
    $routeProvider.when('/',
      {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      });

    $routeProvider.when('/torneos/',
      {
        templateUrl: 'templates/torneos/torneos.html',
        controller: 'TorneosCtrl'
      });

    $routeProvider.when('/arbitros/',
      {
        templateUrl: 'templates/arbitros/arbitros.html',
        controller: 'ArbitrosCtrl'
      });

    $routeProvider.when('/tecnicos/',
      {
        templateUrl: 'templates/tecnicos/tecnicos.html',
        controller: 'TecnicosCtrl'
      });

    $routeProvider.when('/equipos/',
      {
        templateUrl: 'templates/equipos/equipos.html',
        controller: 'EquiposCtrl'
      });

  });
