'use strict';
angular.module('mod.idn')
        .factory('RegisterService', ['RegisterFactory', '$q', 'IDN_CONSTANTS', function(RegisterFactory, $q, IDN_CONSTANTS){

            var factory = {};

            factory.signUp = function(user){

                var deferred = $q.defer();

                RegisterFactory.registerUser().save(user).$promise.then(function(res){
                    if(res.status == IDN_CONSTANTS.INTERNAL_ERROR || res.status == IDN_CONSTANTS.INVALID_DETAILS){
                        deferred.reject(res);
                    } else {
                        deferred.resolve(res);
                    };
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            };


            return factory;
        }])
        .factory('RegisterFactory', ['$resource', 'MOD_IDN', 'AppService', function($resource, MOD_IDN, AppService){
            var factory = {};

            factory.registerUser = function(){

                var bearer = "Bearer " + AppService.token.access_token;
                return $resource(MOD_IDN.API_URL + 'users/signup',{}, {
                    save : {
                        method :'POST',
                        headers :{
                            "Authorization" : bearer
                        }
                    }
                })
            };


            return factory;
        }]);