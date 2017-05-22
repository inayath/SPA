'use strict';

angular.module('clientApp', [
        'ngAnimate',
        'ngResource',
        'ui.router',
        'ngMaterial',
        'LocalStorageModule',
        'angular-loading-bar',
        'ngMessages',
        'underscore',
        'app.config',
        'mod.nbos',
        'mod.idn',
        'mod.m161',
    'md.data.table'
])

angular.module('clientApp')
.constant('CLIENT_CONFIG',{
        CLIENT_ID: '7c2c712e-7f06-44cb-94c5-9576430681de',
        CLIENT_SECRET: 'client-review-api',
        CLIENT_DOMAIN : 'http://localhost:9001'
})
