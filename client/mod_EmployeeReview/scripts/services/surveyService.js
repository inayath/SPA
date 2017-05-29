/**
 * Created by sharief on 5/24/17.
 */
(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('SurveyService', ['SurveyFactory', '$q', 'APP_CONSTANTS', function(SurveyFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.surveys = null;
        factory.survey = null;

        factory.getAllSurveys = function(){
            var deferred = $q.defer();

            SurveyFactory.getAllSurveys().get({}, function(success){
                factory.surveys = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.addEditSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.addEditSurvey().survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };
        factory.updateSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.updateSurvey(paramObj.id).survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };
        factory.assignSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.assignSurvey(paramObj.id).survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return factory;
    }])

    .factory('SurveyFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllSurveys = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.addEditSurvey = function() {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys', {}, {
                'survey':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                },
                'put':{
                    method : 'PUT',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.updateSurvey = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id, {}, {
                'survey':{
                    method : 'PUT',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.assignSurvey = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id+'/schedules', {}, {
                'survey':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };


        return factory;
    }]);
