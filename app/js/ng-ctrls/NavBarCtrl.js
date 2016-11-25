'use strict';

angular.module('myApp')

    .controller('NavBarCtrl', function NavBarCtrl($scope, $location){
        $scope.goTo = function(section){
            $location.path('/'+section);
        }
    });