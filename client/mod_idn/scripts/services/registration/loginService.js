angular.module('mod.idn')
        //ALL SERVICE CALLS
        .factory('LoginService', ['LoginFactory', '$q', 'SessionService', function(LoginFactory, $q, SessionService){

            var factory = {};

            factory.login  = function(user){
                var deferred = $q.defer();


                LoginFactory.authenticateUser().authenticate(user).$promise.then(function(response){

                    deferred.resolve(response);

                }, function(error){


                    deferred.reject(error);

                });

                return deferred.promise;
            };

            factory.logout = function(){
                var deferred = $q.defer();

                LoginFactory.logout().logout({}, function(success){
                    SessionService.deleteSession();
                    deferred.resolve(success);
                }, function(error){
                    deferred.reject(error);
                });

                return deferred.promise;
            };

            return factory;
        }])


        //ALL FACTORY DEFINITIONS START HERE

        .factory('LoginFactory', ['$resource', 'MOD_IDN', 'AppService', 'SessionService', function($resource, MOD_IDN, AppService, SessionService){
            var factory = {};

            factory.logout = function(){
                var bearer = "Bearer " + SessionService.getStoredUserToken();

                return $resource(MOD_IDN.API_URL + 'auth/logout', {},{
                    'logout' :{
                        method : 'GET',
                        headers :{
                            "Authorization" : bearer
                        }
                    }
                });
            };

            factory.authenticateUser = function(){

                var bearer = "Bearer " + AppService.token.access_token;
                return $resource(MOD_IDN.API_URL + 'auth/login', {},{
                    'authenticate' :{
                        method : 'POST',
                        headers :{
                            "Authorization" : bearer
                        }
                    }
                });
            };

            return factory;

        }]);