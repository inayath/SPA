
'use strict';

angular.module('app.config')

.factory('StateService', ['$state', function($state){
    var factory = {};
    factory.state;

    factory.setState = function(event, next, params){
        factory.state = {};
        factory.state.event = event;
        factory.state.next = next;
        factory.state.params= params;
    };

    factory.reset = function(){
        factory.state = null;
    };

    return factory;
}]);