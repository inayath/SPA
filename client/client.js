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
    'md.data.table',
    'schemaForm'
])

angular.module('clientApp')
.constant('CLIENT_CONFIG',{
        CLIENT_ID: '8860c713-35ad-492f-83d5-badb5ec0acbf',
        CLIENT_SECRET: 'review-client-secret',
        CLIENT_DOMAIN : 'http://localhost:9001'
})
