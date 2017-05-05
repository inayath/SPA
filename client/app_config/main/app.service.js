'use strict';


angular.module('app.config')
    .factory('AppService', ['AppFactory', '$q', 'APP_CONSTANTS', 'CLIENT_CONFIG', 'APP_CONFIG', function(AppFactory, $q, APP_CONSTANTS, CLIENT_CONFIG, APP_CONFIG){
        var factory = {};

        factory.token;


        factory.getAppConfig = function(){
            var deferred = $q.defer();

            AppFactory.getConfig().then(function(success){
                for(var key in success.data){
                    APP_CONFIG[key] = success.data[key];
                };
                //factory.config = success;
                deferred.resolve();
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;

        };

        factory.getToken = function(){
            var deferred = $q.defer();
            var obj = {};
            obj.client_id = CLIENT_CONFIG.CLIENT_ID;
            obj.client_secret = CLIENT_CONFIG.CLIENT_SECRET;
            obj.grant_type  = APP_CONSTANTS.GRANT_TYPE;
            obj.scope = APP_CONSTANTS.SCOPE;
            obj.tenant_id = APP_CONSTANTS.TENANT_ID;

            if(!factory.token){
                AppFactory.getClientToken().post($.param(obj)).$promise.then(function(response){
                    console.log(response);

                    factory.token = response;
                    factory.token.config = obj;
                    APP_CONFIG.token = factory.token;

                    deferred.resolve(response);
                }, function(error){
                    console.log(error);
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(factory.token);
            };

            return deferred.promise;
        };

        return factory;

    }])

    .factory('AppFactory', ['APP_CONSTANTS', '$resource', '$http', function(APP_CONSTANTS, $resource, $http){
        var factory = {};

        factory.getClientToken = function(){
            return $resource(APP_CONSTANTS.API_URL + 'oauth/token', {},{
                'post' :{
                    method : 'POST',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            });
        };

        factory.getConfig = function(){
            return $http.get('data/app_config.json')
        };

        return factory;
    }]);