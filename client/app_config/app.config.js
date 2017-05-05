'use strict';

angular.module('app.config', [
    'app.layout',
    'app.theme'
]);


angular.module('app.config')
    .value('APP_CONFIG', {})
    .value('APP_ENV', {})
    .constant('APP_CONSTANTS', {
        API_URL: 'http://api.qa1.nbos.in/',
        API_URL_DEV: 'http://api.qa1.nbos.in/',
        TENANT_ID: '',
        GRANT_TYPE: 'client_credentials',
        SCOPE: '',
        APP_SESSION_KEY: 'THIS_SHOULD_BE_RANDOM_GENERATED_',
        APP_LOGO : '',
        APP_BANNER:''
    })

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "app_config/firstPage/firstPage.html",
                controller: 'FirstPageCtrl',
                data: {
                    type: 'login',
                    authenticate: false
                }
            })
    }]);
