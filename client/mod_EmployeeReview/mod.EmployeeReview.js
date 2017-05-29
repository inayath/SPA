angular.module('mod.m161', []);

angular.module('mod.m161')
  .constant('MOD_EmployeeReview', {
        API_URL: '',
        API_URL_DEV: ''
    })
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('m161', {
                url: '/EmployeeReview',
                parent: 'layout',
                template: "<div ui-view></div>",
                data: {
                    type: 'home'
                }
            })
            .state('m161.header', {
               url: '',
               template: "<div></div>",
               data: {
                   templateUrl:'mod_EmployeeReview/views/menu/EmployeeReview.header.html',
                   position: 1,
                   type: 'header',
                   name: "Profile",
                   module: "EmployeeReview"
               }
           })
            .state('m161.dashboard', {
                url: '/dashboard',
                templateUrl: "mod_EmployeeReview/views/dashboard/EmployeeReview.dashboard.html",
                data: {
                    type: 'home',
                    menu: true,
                    name: "Dashboard",
                    module: "EmployeeReview"
                }

            })
            .state('m161.surveyAssign', {
            url: '/survey/:id/assign',
            templateUrl: "mod_EmployeeReview/views/surveys/assign.admin.html",
            data: {
                type: 'home',

                admin : true,
                disabled : false,
                name: "Admin Page",
                module: "EmployeeReview"
            }
        })
            //FOR APP ADMIN
           .state('m161.admin', {
               url: '/admin',
               templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
               data: {
                   type: 'home',
                   menu: true,
                   admin : true,
                   disabled : false,
                   name: "Admin Page",
                   module: "EmployeeReview"
               }
           });

    }]);