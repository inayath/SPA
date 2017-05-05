'use strict';

angular.module('mod.idn')
.controller('IdnHeaderCtrl', ['$scope', 'LoginService', 'AlertService', '$state', function($scope, LoginService, AlertService, $state){
    $scope.userLogout = function(){
        LoginService.logout().then(function(success){
            $state.go('idn.login');
        }, function(error){
            AlertService.alert("Error Logging Out. You can checkout any time you like, but you can never leave. ");
        });
    };
}])