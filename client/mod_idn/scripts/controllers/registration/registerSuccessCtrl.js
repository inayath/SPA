'use strict';

angular.module('mod.idn')
    .controller('RegisterSuccessCtrl', ['$scope', '$stateParams', 'APP_CONFIG', function($scope, $stateParams, APP_CONFIG){

        $scope.userMessage = false;

        $scope.showValidateEmail = false;

        
        var init = function(){
            if(APP_CONFIG.MOD_IDN && APP_CONFIG.MOD_IDN.validate_email){
                $scope.showValidateEmail = true;
            } else {
                $scope.showValidateEmail = false;
            }
        };

        init();
    }]);