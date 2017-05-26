/**
 * Created by sharief on 5/24/17.
 */
(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('TemplateService', ['TemplateFactory', '$q', 'APP_CONSTANTS', function(TemplateFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.templates = null;
        factory.template = null;

        factory.getAllTemplates = function(){
            var deferred = $q.defer();

            TemplateFactory.getAllTemplates().get({}, function(success){
                factory.templates = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        return factory;
    }])

    .factory('TemplateFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllTemplates = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/templates', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

        return factory;
    }]);
