'use strict';

angular.module('mod.idn')
    .factory('RolesService', ['RolesFactory', '$q', 'APP_CONSTANTS', function(RolesFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.roles = null;

        factory.getUserRoles = function(){
            var deferred = $q.defer();
            deferred.resolve(true);
            return deferred.promise;
        };

        /*todo: waiting for ROles API*/

        factory.getUserRoles_NA = function(uuid){
            var deferred = $q.defer();

            RolesFactory.getUserRole().get({tenantId:APP_CONSTANTS.TENANT_ID, uuid:uuid}, function(success){
                console.log("SUCCESS IN ROLESSERVICE");
                deferred.resolve(success);
            }, function(error){
                console.log("ERROR IN ROLESSERVICE");
                deferred.reject(error);
            });

            // RolesFactory.getUserObject().get().$promise.then(function(success){
            //     deferred.resolve(success);
            // }, function(error){
            //     deferred.reject(error);
            // });

            return deferred.promise;

        };

        factory.getAllRoles = function(){
            var deferred = $q.defer();

            RolesFactory.getAllRoles().get({tenantId:APP_CONSTANTS.TENANT_ID}, function(success){
                factory.roles = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        return factory;
    }])

    .factory('RolesFactory', ['$resource', 'MOD_IDN', 'SessionService', function($resource, MOD_IDN, SessionService){
        var factory = {};

        factory.getUserRole = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_IDN.API_URL + 'tenants/:tenantId/members/:uuid/roles', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            })
        };

        factory.setUserRole = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_IDN.API_URL + 'tenants/:tenantId/members/:uuid/roles', {}, {
                'get':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            })
        };


        factory.getAllRoles = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(MOD_IDN.API_URL + 'tenants/:tenantId/roles', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            })
        };
        return factory;
    }]);