'use strict';

/**
 * @ngdoc overview
 * @name CodingLabs
 * @description
 * # NBOS LAYOUT MODULE
 *
 * Main module of the application.
 */
angular
    .module('app.layout', []);

angular
    .module('app.layout')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        $stateProvider
            .state('layout', {
                url: '',
                abstract : true,
                views : {
                    '':{
                        templateUrl: 'app_config/layout/layout.html',
                        controller : 'LayoutCtrl'
                    },
                    'header@layout':{
                        templateUrl: 'app_config/layout/header.html'
                    },
                    'nav@layout':{
                        templateUrl: 'app_config/layout/nav.html'
                    },
                    'footer@layout':{
                        templateUrl: 'app_config/layout/footer.html'
                    }
                }
            });

    }]);
