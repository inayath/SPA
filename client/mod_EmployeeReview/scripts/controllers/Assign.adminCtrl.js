(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('SurveyAssignCtrl', ['$scope', 'UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', function($scope, UserService, $mdDialog, SurveyService, CustomerService, $timeout){

        $scope.customers = [];
        $scope.customerContacts = [];
        $scope.customerEmployees = [];

        var init = function(){
           CustomerService.getAllCustomers().then(function (data){
                $scope.customers = data;
            });

        };
        init();
        $scope.getCustomerData = function(){
            var selectedCustomer = $scope.survey.customer;
            CustomerService.getAllContacts(selectedCustomer).then(function (data){
                $scope.customerContacts = data;
            });
            CustomerService.getAllEmployees(selectedCustomer).then(function (data){
                $scope.customerEmployees = data;
            });
        }

        $scope.survey = {name:'Care QA Team Survey'};

        $scope.querySearch = function(query) {
            var results = query && $scope.customerContacts > 0 ? $scope.customerContacts.filter( createFilterFor(query) ) : $scope.customerContacts,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.name.indexOf(lowercaseQuery) === 0);
            };

        }
        $scope.selectedEmployees = function () {
            $scope.survey.employess = $filter('filter')($scope.customerEmployees, {checked: true});
        }


    }]).config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

});