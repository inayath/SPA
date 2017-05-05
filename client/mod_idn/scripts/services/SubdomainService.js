'use strict';

angular.module('mod.idn')
.service('SubdomainService', ['SubdomainFactory', '$q', function(SubdomainFactory, $q){

    this.checkForSubdomain = function(name) {
        var obj = {};
        obj.name = name;
        
        var deferred = $q.defer();

        SubdomainFactory.checkSubdomain().get(obj).$promise.then(function(success){
            //if domain exists then not unique
            deferred.reject();
        }, function(error){
            //domain does not exist so success
            deferred.resolve();
        })

        return deferred.promise;
    };

    return this;


}])
.factory('SubdomainFactory', ['APPCONFIG', '$resource', function(APPCONFIG, $resource){
    var factory = {};

    factory.checkSubdomain = function(){
        return $resource(APPCONFIG.API_URL + 'subDomain/:name', {name : '@name'},
            {
                get: {
                    method : 'GET',
                    isArray : false
                }
            })
    };

    return factory;
}])