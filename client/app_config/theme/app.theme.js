'use strict';

angular.module('app.theme', []);

angular.module('app.theme')
.config(['$mdThemingProvider', function ($mdThemingProvider) {

        //Angular Material Theme Configuration
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('blue')
            .warnPalette('red');

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .accentPalette('green')
            .warnPalette('red')
            .dark();

    }]);