'use strict';

angular.module('mod.idn')
        .factory('UserService', ['UserFactory', '$q', function(UserFactory, $q){

            var factory = {};

            factory.user_access_token;

            factory.member;

            // factory.token;

            //TODO: retrieve user_access_token for all calls for modules from UserService not SessionService

            factory.setUser = function(key, val){
                factory[key] = val;

            };

            factory.checkUserObj = function(){
                return factory.member? true:false;
            };

            factory.deleteUser = function(){
                factory.member = null;
                factory.token = null;
            };

            factory.getUserObject = function(val){
                var deferred = $q.defer();

                UserFactory.getUserObject().get({userId:val}, function(success){
                    console.log("USERSERVICE:getUserObject");
                    console.log(success);
                    factory.member = success;
                    deferred.resolve(success);
                }, function(error){
                    
                    deferred.reject(error);
                });

                return deferred.promise;

            };

            return factory;
        }])

        .factory('UserFactory', ['$resource', 'MOD_IDN', 'SessionService', function($resource, MOD_IDN, SessionService){
            var factory = {};

            factory.getUserObject = function(){
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.API_URL + 'users/:userId', {}, {
                    'get':{
                        method : 'GET',
                        headers: {
                            "Authorization" : bearer
                        }
                    }
                })
            };

            return factory;
        }]);