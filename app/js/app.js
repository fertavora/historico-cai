'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

angular.module('myApp', [
  'Authentication',
  'Home',
  'ngRoute',
  'ngCookies'
])

  .directive(['onLastRepeat', function() {
        return function(scope, element, attrs) {
            if (scope.$last) setTimeout(function(){
                scope.$emit('onRepeatLast');
            }, 1);
        };
  }])
  
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
  
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/login', 
        {
          controller: 'LoginCtrl',
          templateUrl: 'login.html'
        })
        
      .when('/',
        {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        })

      .when('/torneos/',
        {
          templateUrl: 'templates/torneos/torneos.html',
          controller: 'TorneosCtrl'
        })

      .when('/arbitros/',
        {
          templateUrl: 'templates/arbitros/arbitros.html',
          controller: 'ArbitrosCtrl'
        })

      .when('/tecnicos/',
        {
          templateUrl: 'templates/tecnicos/tecnicos.html',
          controller: 'TecnicosCtrl'
        })

      .when('/equipos/',
        {
          templateUrl: 'templates/equipos/equipos.html',
          controller: 'EquiposCtrl'
        })
        
      .otherwise({ redirectTo: '/login' });

  }])
  
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
          $location.path('/login');
        }
      });
    }]);
