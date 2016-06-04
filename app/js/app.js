'use strict';

var app = angular.module('myApp', ['ngRoute'])
  .directive('onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast');
            }, 1);
        };
  })
  .factory('myInterceptor', function($q) {
    return {
      // optional method
      'request': function (config) {
        // console.log('request ok on interceptor');
        return config;
      },

      // optional method
      'requestError': function (rejection) {
        console.log('requestError on interceptor');
        console.log(rejection);
        return $q.reject(rejection);
      },


      // optional method
      'response': function (response) {
        // console.log('response on interceptor');
        return response;
      },

      // optional method
      'responseError': function (rejection) {
        console.log('responseError on interceptor');
        return $q.reject(rejection);
      }
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('myInterceptor');
  }])
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
