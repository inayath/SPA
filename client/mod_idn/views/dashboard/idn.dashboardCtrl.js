/**
 *
 * @ ACTION 1:
 * Get all user related information here
 * Get all APP level configurations here
 * Redirect to app configured main page post login
 */

'use strict';

angular.module('mod.idn')
    .controller('IdnDashboardCtrl', ['$scope', 'SessionService', 'UserService', 'RolesService', '$state', '$q', 'APP_CONFIG', 'AppService', 'AppLayoutService', 'StateService', function($scope, SessionService, UserService, RolesService, $state, $q, APP_CONFIG, AppService, AppLayoutService, StateService) {

        $scope.showError = false;
        $scope.showInvalidToken = false;
        $scope.error = '';


        var navigateUserToModule = function() {

            var state = StateService.state;

            if (state) {
                $state.go(state.next.name, state.params);
            } else {
                $state.go(APP_CONFIG.MOD_IDN.login_redirect);
            };
            /*
             TODO: If accessing admin page check if role exists. Only then redirect else destroy session and redirect to 403 page.
             */
        };


        if (SessionService.checkSession()) {
            var session = SessionService.getSession();
            console.log("IDN.DASHBOARDCTRL: SESSION");
            console.log(session);


            var token = AppService.getToken(),
                config = AppService.getAppConfig(),
                layout = AppLayoutService.createMenu(),
                user = UserService.getUserObject(session.uuid),
                roles = RolesService.getUserRoles(session.uuid);

            /*
             Todo : Not included roles yet. Include roles when API is available.
             TODO : How and where do we handle invalid/expired user_access_token
             */

            if (APP_CONFIG.token) {
                $q.all([user, roles])
                    .then(function(success) {
                        navigateUserToModule();

                    }, function(error) {
                        // error.forEach(function(element){
                        //     $scope.error += "<p>" +JSON.stringify(element) +"</p>";
                        //     $scope.showError = true;
                        // });
                        if (error.status && error.status === 401) {
                            $scope.showInvalidToken = true;
                        } else {
                            $scope.showError = true;
                        };


                    })
            } else {
                $q.all([token, config, layout, user, roles])
                    .then(function(success) {

                        UserService.setUser("token", session);
                        UserService.setUser("roles", {});
                        navigateUserToModule();

                    }, function(error) {

                        if (error.status && error.status === 401) {
                            $scope.showInvalidToken = true;
                        } else {
                            $scope.showError = true;
                        };

                        // error.forEach(function(element){
                        //     $scope.error += "<p>" +JSON.stringify(element) +"</p>";
                        //     $scope.showError = true;
                        // });
                    })
            };


        } else {
            $state.go('idn.login');
        };


        $scope.reLogin = function() {
            SessionService.deleteSession();
            UserService.deleteUser();
            $state.go('idn.login');
        };

    }]);
