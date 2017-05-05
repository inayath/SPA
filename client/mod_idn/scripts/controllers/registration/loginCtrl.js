/**
 * Created by nbos on 3/14/16.
 */
angular.module('mod.idn')
    .controller('LoginCtrl', ['$scope', 'LoginService', 'AlertService', 'SessionService', '$state', 'UserService', 'FBService', 'GoogleService', 'APP_CONFIG', function($scope, LoginService, AlertService, SessionService, $state, UserService, FBService, GoogleService, APP_CONFIG) {

        $scope.showProgress = false;
        $scope.disabledLogin = false;
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.banner = '';

        $scope.validateuser2 = function() {
            $state.go('dashboard');
        };

        var setUserData = function(responseObj) {
            UserService.setUser("member", responseObj.member);
            UserService.setUser("token", responseObj.token);

            SessionService.setSession(responseObj.token, responseObj.member.uuid);
            
            if(SessionService.checkSession())
            {
                console.log("SESSION EXISTS");
                $state.go('idn.dashboard');
            }
        };

        $scope.validateuser = function(loginForm) {

            $scope.disabledLogin = true;
            // $scope.showProgress = true;
            LoginService.login($scope.user)
                .then(function(success) {
                    try {
                        setUserData(success);
                    } catch (err) {
                        alert("ERROR");
                        var message = err.statusText + ": ";
                        for (var i = 0; i < err.data.errs.length; i++) {
                            message += error.data.errors[i].message + ". ";
                        }
                        AlertService.alert(message, 'md-warn');
                    } finally {
                        $scope.disabledLogin = false;
                        $scope.user = {
                            username: '',
                            password: ''
                        };
                    };
                }, function(error) {
                    $scope.disabledLogin = false;
                    var message = error.statusText + ": ";
                    for (var i = 0; i < error.data.errors.length; i++) {
                        message += error.data.errors[i].message + ". ";
                    }
                    AlertService.alert(message, 'md-warn');
                });

        };

        $scope.socialLogin = function(socialType) {
            switch (socialType) {
                case 'fb':
                    FBService.fbLogin().then(function(authResponse) {
                        if (authResponse) {
                            setUserData(authResponse);
                        }
                    }, function(error) {
                        var message = error.statusText + ": ";
                        for (var i = 0; i < error.data.errors.length; i++) {
                            message += error.data.errors[i].message + ". ";
                        }
                        AlertService.alert(message, 'md-warn');
                    });
                    break;
                case 'google':
                    GoogleService.googleLogin().then(function(authResponse) {
                        if (authResponse) {
                            setUserData(authResponse);
                        }
                    }, function(error) {
                        var message = error.statusText + ": ";
                        for (var i = 0; i < error.data.errors.length; i++) {
                            message += error.data.errors[i].message + ". ";
                        }
                        AlertService.alert(message, 'md-warn');
                    });
                    break;
            }
        };

        $scope.register = function(){
            $state.go('idn.register');
        }

         var init = function(){
            if(APP_CONFIG && APP_CONFIG.APP && APP_CONFIG.APP.appOwner && APP_CONFIG.APP.appOwner.banner){
                $scope.banner = APP_CONFIG.APP.appOwner.banner;
            }
        };
        init();


    }]);
