'use strict';
angular.module('app.config')
.controller('FirstPageCtrl', ['$scope', 'AppService', 'AppLayoutService', 'StateService', '$state', function($scope, AppService, AppLayoutService, StateService, $state){
    $scope.message="Hello and Welcome to your App";

    $scope.showError = false;
    $scope.error = "";
    /*
     TODO: THIS SHOULD BE A BLOCKING CALL
     ALTERNATERLY, MOVE THIS TO THE NODE SERVER
     */


    AppService.getToken().then(function(success){
        //Get app configuration here
        AppService.getAppConfig().then(function(success){

            AppLayoutService.createMenu().then(function(success){
                console.log("App Ready");
                if(StateService.state){
                    $state.go(StateService.state.next.name, StateService.state.params);
                } else {
                    $state.go('idn.dashboard');
                }

            }, function(error){
                $scope.error = "<h4>Error in Creating Menu</h4>";
                $scope.error += "<p>" +error +"</p>";
            });

        }, function(error){
            console.error(error);
            $scope.error = "<h4>Error in Retriving Config</h4>";
            $scope.error += "<p>" +error +"</p>";
        });
    }, function(error){
        console.error(error);
        $scope.error = "<h4>Error in Retriving Token</h4>";
        $scope.error += "<p>" +error +"</p>";
    });

}]);