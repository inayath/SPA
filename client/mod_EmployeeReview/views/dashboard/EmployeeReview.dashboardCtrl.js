(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
.controller('EmployeeReviewDashboardCtrl', ['$scope', 'UserService', '$mdDialog', function($scope, UserService, $mdDialog){

    $scope.message = "Hello from your module Dashboard";
    $scope.survey = {};
    $scope.surveys = [];
    var init = function(){
        $scope.surveys = [
            {id:1,name: 'Care International Survey', description: 'survey description',
                template:'CareIntTemplate', status: true},
            {id:2, name: 'SavingStare Survey', description: 'survey description', template:'SavingStarTemplate', status: false},
            {id:3, name: 'Upromise Survey', description: 'survey description', template:'CareTemplate', status: true}
            ];
        $scope.templates = [
            {id:1, name:'WaveTemplate'},{id:2, name:'CareTemplate'},
        ];
        $scope.autocolumn = [
            { //Define the Table content
                name: "name", //The identifier name
                display: "Name" //the name that will be displayed
            }, {
                name: "description",
                display: "Description"
            }, {
                name: "template",
                display: "Template"
            },{
                name: "status",
                display: "Verified"
            },
            {
                name: "",
                display: " "
            }
        ];
        $scope.datatable = {
            "count": 3, //how many rows do we have
            "data": $scope.surveys

        };
        $scope.limitOptions = [5, 10, 15]; //How many entries per page options
        $scope.options = {
            pageSelect: true //Yes we want a page selection
        };
        $scope.query = { //Define the query
            order: 'name', //What should be the initial sorting
            limit: 2, //How many entries per page
            page: 1 //What is the starting page
        };
    };

    init();

    $scope.addSurvey = function(event){
        $mdDialog.show({
            controller: function($scope, $mdDialog, SessionService,  AlertService) {
                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                $scope.saveDialog = function() {
                    $scope.survey.id = $scope.surveys.length + 1;
                    if(!$scope.survey.status) {
                        $scope.survey.status = false;
                    }
                    $scope.surveys.push($scope.survey);
                    $mdDialog.hide();
                };
            },
            templateUrl: 'mod_EmployeeReview/views/surveys/addSurvey.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            clickOutsideToClose:true
        })
            .then(function(survey) {
                $scope.status = 'You saved the dialog.';
                $scope.survey = {};

            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.editSurvey = function(index, event){
        $mdDialog.show({
            controller: function($scope, $mdDialog, SessionService, AlertService, Survey) {
                $scope.survey = Survey;
                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                $scope.saveDialog = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: 'mod_EmployeeReview/views/surveys/addSurvey.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            locals:{
                "Survey":$scope.surveys[index]
            }
        })
            .then(function() {
                $scope.surveys[index] = $scope.survey;
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

}]);