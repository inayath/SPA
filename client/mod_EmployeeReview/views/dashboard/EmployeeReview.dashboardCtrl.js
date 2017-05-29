(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
.controller('EmployeeReviewDashboardCtrl',
    ['$scope', 'UserService', '$mdDialog', 'SurveyService', 'TemplateService', function($scope, UserService, $mdDialog, SurveyService, TemplateService){

    $scope.message = "Hello from your module Dashboard";
    $scope.survey = {};
    $scope.surveys = [];
    $scope.templates = [];
    var init = function(){
        TemplateService.getAllTemplates().then(function (data){
            $scope.templates = data;
        });
        SurveyService.getAllSurveys().then(function(data){

            $scope.surveys = data;

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
                "count": $scope.surveys.length, //how many rows do we have
                "data": $scope.surveys

            };
            $scope.limitOptions = [10, 15]; //How many entries per page options
            $scope.options = {
                pageSelect: true //Yes we want a page selection
            };
            $scope.query = { //Define the query
                order: 'name', //What should be the initial sorting
                limit: 100, //How many entries per page
                page: 1 //What is the starting page
            };
        });

    };

    init();

    $scope.addSurvey = function(event){
        $scope.survey = {};
        $mdDialog.show({
            controller: function($scope, $mdDialog, SessionService, SurveyService, AlertService) {
                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                $scope.saveDialog = function() {
                    SurveyService.addEditSurvey($scope.survey).then(function(data) {
                        console.log("im in", data);
                        $scope.surveys.push(data);
                    });

                    if(!$scope.survey.status) {
                        $scope.survey.status = false;
                    }

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

    $scope.editSurvey = function(id){
        $mdDialog.show({
            controller: function($scope, $mdDialog, SessionService, AlertService, Survey) {
                $scope.survey = Survey;
                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                $scope.saveDialog = function() {
                    SurveyService.updateSurvey($scope.survey).then(function(data) {
                        console.log("edit survey in", data);
                        //$scope.surveys.push(data);
                        return data;
                    });
                    $mdDialog.hide();
                };
            },
            templateUrl: 'mod_EmployeeReview/views/surveys/addSurvey.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true,
            locals:{
                "Survey": _.find($scope.surveys, function (survey) { return survey.id === id;})
            }
        })
            .then(function(data) {
                var index = _.find($scope.surveys, function (survey) { return survey.id === id;});
                $scope.surveys[index] = $scope.survey;
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    $scope.showTemplate = function(templateSlug){
        $mdDialog.show({
            controller: function($scope, $mdDialog, SessionService, AlertService) {
                $scope.templateName = templateSlug;
                $scope.schema = {
                    type: "object",
                    properties: {
                        level: {
                            type: "string",
                            title: 'What level is the resource performing at?',
                            enum: ['Jr Developer','Developer','Sr. Developer','Lead','Architect']
                        },
                        performance: {
                            type: "string",
                            title: 'What  is the performance at that level',
                            enum: ['Not meeting Expectations','Meeting Expectations','Exceeding Expectations','Consistently Expectations']
                        },
                        name: { type: "string",
                            'x-schema-form': {
                                "type": "textarea"
                            },
                            title: "What are the areas of improvement"  },


                    }
                };

                $scope.form = [
                    "*",
                    {
                        type: "submit",
                        title: "Save"
                    }
                ];

                $scope.model = {};
                $scope.closeDialog = function() {
                    $mdDialog.cancel();
                };
                $scope.saveDialog = function() {
                    $mdDialog.hide();
                };
            },
            templateUrl: 'mod_EmployeeReview/views/template/previewForm.html',
            parent: angular.element(document.body),
            targetEvent: event,
            scope: $scope,
            preserveScope: true
        })
            .then(function() {
                $scope.status = 'You previewed the form in dialog.';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
}]);