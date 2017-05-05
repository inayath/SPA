'use strict';
angular.module('mod.idn')
    .controller('RegisterCtrl', ['$scope', '$state', 'RegisterService', 'AlertService', 'AppService', 'RolesService', function($scope, $state, RegisterService, AlertService, AppService, RolesService) {


        $scope.showCompany = true;
        $scope.showVendor = true;
        $scope.tab = {};
        $scope.tab.selectedUserTab = 0;
        $scope.tab.selectedOrgTab = 0;
        $scope.tab.selectedVendorTab = 0;
        $scope.disabledRegister = false;
        $scope.subdomainError = false;
        // $scope.onRegister = false;

        $scope.user = {
            clientId: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };


        //FOR USER

        $scope.registerUser = function(form) {


            $scope.disabledRegister = true;

            $scope.user.username = $scope.user.email;
            $scope.user.clientId = AppService.token.config.client_id;

            console.log($scope.user);

            RegisterService.signUp($scope.user).then(function(data) {

                //User registered successfully
                $scope.disabledRegister = false;

                $scope.user = {
                    clientId: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                };


                $state.go('idn.success');

            }, function(error) {
                $scope.disabledRegister = false;
                var message = error.statusText + ": ";
                for (var i = 0; i < error.data.errors.length; i++) {
                    message += error.data.errors[i].message + ". ";
                }
                AlertService.alert(message, 'md-warn');

            });
        };

        $scope.login = function() {
            $state.go('idn.login');
        }

        /*
            Getting All Roles
         */

        $scope.roles = [];

    }]);
