/**
 * Created by sharief on 5/24/17.
 */
(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('CustomerService', ['CustomerFactory', '$q', 'APP_CONSTANTS', function(CustomerFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.fullList = null;
        factory.customerContacts = null;
        factory.customerEmployees = null;

        factory.getAllCustomers = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllCustomers().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.getAllContacts = function(id){
            var deferred = $q.defer();

            CustomerFactory.getAllContacts(id).get({}, function(success){
                factory.customerContacts = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.getAllEmployees = function(id){
            var deferred = $q.defer();

            CustomerFactory.getAllEmployees(id).get({}, function(success){
                factory.customerEmployees = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        return factory;
    }])

    .factory('CustomerFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllCustomers = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getAllContacts = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers/'+id+'/contacts', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getAllEmployees = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers/'+id+'/employees', {}, {
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
