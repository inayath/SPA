(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('SurveyAssignCtrl', ['$scope', '$stateParams' ,'UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', function($scope, $stateParams, UserService, $mdDialog, SurveyService, CustomerService, $timeout){

        $scope.customers = [];
        $scope.customerContacts = [];
        $scope.customerEmployees = [];
        $scope.formObject = {reviewer:null};

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

        $scope.survey = {id: $stateParams.id, name:'Care QA Team Survey'};

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
            var selectedEmployess = _.filter($scope.customerEmployees, {checked: true});
            $scope.survey.reviewee_ids = _.pluck(selectedEmployess, "id");
        }
        $scope.assignSurvey = function (status) {
            $scope.survey.reviewer_id = $scope.formObject.reviewer.id || null;
            $scope.survey.status = status;
            SurveyService.assignSurvey($scope.survey).then(function (data){
                $scope.customers = data;
            });
        }


    }]).config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

});