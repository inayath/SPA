/*
 * Authentication service for Facebook Login
 * Handles login, linking of facebook account
 *
 */

angular.module('mod.idn').factory('FBService', ['SocialLogin', '$q', function(SocialLogin, $q) {
    var sAuthService = {};
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1156227224396474',
            xfbml: true,
            version: 'v2.6'
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    /*
     * Login Function for facebook;
     */
    sAuthService.fbLogin = function(isConnect) {
        var deferred = $q.defer();
        FB.login(function(response) {
            if (response.authResponse) {
                var credentials = {};
                credentials.clientId = "my-client";
                credentials.accessToken = response.authResponse.accessToken;
                credentials.expiresIn = response.authResponse.expiresIn;
                if (isConnect) {
                    //user Logged in
                    SocialLogin().link({
                        socialUrl: 'facebook'
                    }, credentials).$promise.then(function(auth) {
                            deferred.resolve(auth);
                        },
                        function(error) {
                            deferred.reject(error);
                        });
                } else {
                    //user not logged in
                    SocialLogin().login({
                        socialUrl: 'facebook'
                    }, credentials).$promise.then(function(auth) {
                            deferred.resolve(auth);
                        },
                        function(error) {
                            deferred.reject(error);
                        });
                }
            } else {
                deferred.reject();
            }
        }, {
            scope: 'email'
        });
        return deferred.promise;
    }


    return sAuthService;

}]);
