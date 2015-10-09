'use strict';

var app = angular.module('myApp', ['ngRoute'])
  .config(function($routeProvider){
    $routeProvider.when('/',
      {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      });

    $routeProvider.when('/torneos/',
      {
        templateUrl: 'templates/torneos.html',
        controller: 'TorneosCtrl'
      });

    $routeProvider.when('/arbitros/',
      {
        templateUrl: 'templates/arbitros.html',
        controller: 'ArbitrosCtrl'
      });

    $routeProvider.when('/tecnicos/',
      {
        templateUrl: 'templates/tecnicos.html',
        controller: 'TecnicosCtrl'
      });

      $routeProvider.when('/equipos/',
        {
          templateUrl: 'templates/equipos.html',
          controller: 'EquiposCtrl'
        });

  });
