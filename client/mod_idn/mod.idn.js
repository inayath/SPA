'use strict';

/**
 * @ngdoc overview
 * @name CodingLabs
 * @description
 * # CodingLabsApp
 *
 * Main module of the application.
 */
angular.module('mod.idn', []);


angular.module('mod.idn')

    .constant('MOD_IDN', {
        API_URL: 'http://api.qa1.nbos.in/api/identity/v0/',
        API_URL_DEV: 'http://api.qa1.nbos.in/api/identity/v0/',
        // API_URL : 'http://10.9.9.6:8080/api/identity/v0/',
        // API_URL : 'http://10.9.8.53:8080/api/identity/v0/',
        QUALIFIER :'idn'
        // API_URL: 'http://api.nbos.in/identity/v0/auth/login'
    })

    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', function($stateProvider, $urlRouterProvider, $mdThemingProvide){

        // $urlRouterProvider.otherwise('/idn/dashboard');

        $stateProvider
            .state('idn', {
                url: '/idn',
                template: "<div ui-view flex></div>",
                data: {
                    type: 'home',
                    authenticate : false
                }
            })
            //FOR NAVIGATION
            .state('idn.header', {
                url: '/idn',
                template: "<div></div>",
                data: {
                    templateUrl:'mod_idn/views/menu/idn.header.html',
                    position: 999,
                    type: 'header',
                    name: "Profile",
                    module: "IDN"
                }
            })
            .state('idn.nav', {
                url: '/idn',
                template: "<div></div>",
                data: {
                    templateUrl:'mod_idn/views/menu/idn.nav.html',
                    type: 'nav',
                    name: "Projects",
                    module: "IDN"
                }
            })
            .state('idn.login', {
                url: '/login',
                templateUrl: "mod_idn/views/registration/login.html",
                data: {
                    type: 'login',
                    authenticate : false
                }
            })
            .state('idn.forgot', {
                url: '/forgot',
                templateUrl: "mod_idn/views/registration/forgot.html",
                data: {
                    type: 'login'
                }
            })
            .state('idn.register', {
                url: '/register',
                templateUrl: "mod_idn/views/registration/register.html",
                controller:'RegisterCtrl',
                data: {
                    type: 'login',
                    authenticate : false
                }
            })
            .state('idn.success', {
                url: '/register/success',
                templateUrl: "mod_idn/views/registration/register.success.html",
                data: {
                    type: 'login',
                    authenticate : false
                }
            })
            .state('idn.unauthorised', {
                url: '/unauthorised',
                templateUrl: "mod_idn/views/unauthorised.html",
                data: {
                    type: 'login',
                    authenticate : false
                }
            })
            .state('idn.dashboard', {
                url: '/dashboard',
                templateUrl: "mod_idn/views/dashboard/idn.dashboard.html",
                data: {
                    type: 'home',
                    authenticate : true
                }
            })
            .state('idn2', {
                url: '/idn2',
                template: "<div ui-view></div>",
                parent:'layout',
                data: {
                    type: 'home',
                    authenticate : false
                }
            })
            .state('idn2.profile', {
                url: '/profile',
                templateUrl: "mod_idn/views/profile/idn.profile.html",
                data: {
                    type: 'home',
                    authenticate : true
                }
            })
            .state('idn2.settings', {
                url: '/settings',
                templateUrl: "mod_idn/views/settings/idn.settings.html",
                data: {
                    type: 'home',
                    authenticate : true
                }
            })
            .state('idn.403', {
                url: '/403',
                templateUrl: "mod_idn/views/403.html",
                data: {
                    type: 'home',
                    authenticate : true
                }
            });
    }])
    
    .run(function(SessionService, UserService, $state, $rootScope, APP_CONFIG, StateService) {

        $rootScope.$on('$stateChangeStart', function(event, next, params) {

            if(SessionService.checkSession()){

                /*
                    If Session Exists, then get all app related data, user related date etc. from session dashboard
                 */

                if(APP_CONFIG.token && UserService.checkUserObj()){

                    //Continue to where the wind blows
                    console.log("Going Where the wind blows");

                } else {

                    if(next.name != 'idn.dashboard'){
                        event.preventDefault();

                        //This if condition is to prevent the StateService from saving a login type page.

                        if(next.data && next.data.type){
                            if(next.data.type != 'login'){
                                StateService.setState(event, next, params);
                            };
                        } else {
                            StateService.setState(event, next, params);
                        };

                        $state.go('idn.dashboard');
                    };

                }

            } else {

                /*
                    If Session Does not Exist.
                 */
                if(APP_CONFIG.token){

                    if(next.data && next.data.type != 'login'){
                        event.preventDefault();
                        $state.go('idn.login');
                    } else {
                        // continue to whichever login page you are going to
                    }

                } else {
                    // Redirect to load config first.
                    if(next.name != 'home'){

                        event.preventDefault();
                        if(next.data && next.data.type != 'login'){
                            // trying to access an app page without session. Smartly save time by setting redirect to login.
                            // Or am i being over smart here?
                            next.name = 'idn.login';
                        };

                        if(next.data && next.data.type){
                            if(next.data.type != 'login'){
                                StateService.setState(event, next, params);
                            };
                        } else {
                            StateService.setState(event, next, params);
                        };
                        $state.go('home');

                    };

                };

            };

        });
    });
