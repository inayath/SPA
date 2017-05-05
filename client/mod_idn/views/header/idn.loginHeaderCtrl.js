'use strict';

angular.module('mod.idn')
    .controller('loginHeaderCtrl', ['$scope', '$window', 'CLIENT_CONFIG', 'APP_CONFIG', function ($scope, $window, CLIENT_CONFIG, APP_CONFIG) {

        $scope.isLogin = false;
        $scope.logo = '';
        $scope.moduleName = APP_CONFIG.APP.appName;
        
        $scope.website = function(){
            var url = CLIENT_CONFIG.CLIENT_DOMAIN + '/site'; 
            $window.open(url, "_blank");
        };

        var init = function () {
        	if(APP_CONFIG && APP_CONFIG.APP && APP_CONFIG.APP.appOwner && APP_CONFIG.APP.appOwner.logo){
        		$scope.logo = APP_CONFIG.APP.appOwner.logo;
        	}
        };

        init();
    }])