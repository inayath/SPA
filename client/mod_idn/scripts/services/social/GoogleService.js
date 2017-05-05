/*
 * Authentication service for Social Logins
 *
 */

angular.module('mod.idn').factory('GoogleService', ['SocialLogin', '$q', function(SocialLogin, $q) {
    var sAuthService = {};
    /*
     * Login function for Google+
     */
    sAuthService.googleLogin = function(isConnect) {
        deferredGoogle = $q.defer();
        isGoogleConnect = isConnect;
        var additionalParams = {
            'callback': sAuthService.gpResponse
        };
        gapi.auth.signIn(additionalParams);
        return deferredGoogle.promise;
    }
    sAuthService.gpResponse = function(gpAuthResponse) {
        if (gpAuthResponse['status']['signed_in'] && gpAuthResponse["status"]["method"] == "PROMPT") {
            var credentials = {};
            credentials.clientId = "my-client";
            credentials.accessToken = gpAuthResponse['access_token'];
            credentials.expiresIn = gpAuthResponse['expires_in'];
            if (isGoogleConnect) {
                SocialLogin().link({
                    socialUrl: 'googlePlus',
                }, credentials).$promise.then(function(auth) {
                        deferredGoogle.resolve(auth);
                    },
                    function(error) {
                        deferredGoogle.reject(error);
                    });
            } else {
                SocialLogin().login({
                    socialUrl: 'googlePlus',
                }, credentials).$promise.then(function(auth) {
                        deferredGoogle.resolve(auth);
                    },
                    function(error) {
                        deferredGoogle.reject(error);
                    });
            }
        } else {

        }
    };
    return sAuthService;

}]);
