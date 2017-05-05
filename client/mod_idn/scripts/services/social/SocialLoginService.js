angular.module('mod.idn').
factory('SocialLogin', function($resource, MOD_IDN, AppService, SessionService) {
    return function() {
        var bearer = "Bearer " + AppService.token.access_token;
        var accessToken = SessionService.getSession().accessToken;
        return $resource(MOD_IDN.API_URL + 'auth/social/:socialUrl/connect', {
            socialUrl: '@socialUrl',
        }, {
            'login': {
                method: 'POST',
                headers: {
                    "Authorization": bearer
                }
            },
            'link': {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        });
    };
});