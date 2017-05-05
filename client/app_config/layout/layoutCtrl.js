angular.module('app.layout')
    .controller('LayoutCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log){
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        };

    }])
    .controller('NavCtrl', ['$scope', '$mdSidenav', '$log', 'AppLayoutService', function ($scope, $mdSidenav, $log, AppLayoutService) {
        $scope.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    $log.debug("close LEFT is done");
                });
        };

        $scope.menu = AppLayoutService.nav;

        /*
         Code for nav menu toggle functionality
         */
        $scope.isOpen = function(section) {
            return $scope.menu.isSectionSelected(section);
        };

        $scope.toggleOpen = function(section) {
            $scope.menu.toggleSelectSection(section);
        };


    }])

    .controller('HeaderCtrl', ['$scope', '$mdSidenav', 'AppLayoutService', 'APP_CONFIG', function ($scope, $mdSidenav, AppLayoutService, APP_CONFIG) {
        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        $scope.moduleName = APP_CONFIG.APP.appName;
        $scope.headerItems = AppLayoutService.headerNav;
        $scope.logo = ''

        $scope.headerItems = AppLayoutService.headerNav;
        if (APP_CONFIG && APP_CONFIG.APP && APP_CONFIG.APP.appOwner && APP_CONFIG.APP.appOwner.logo) {
            $scope.logo = APP_CONFIG.APP.appOwner.logo;
        }


    }])
    //Code for Left Menu
    .run(['$templateCache', function ($templateCache) {
        $templateCache.put('partials/menu-toggle.tmpl.html',
            '<md-button class="md-button-toggle"\n' +
            '  ng-click="toggle()"\n' +
            '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
            '  flex layout="row"\n' +
            '  aria-expanded="{{isOpen()}}">\n' +
            '  {{section.name}}\n' +
            '   <span class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}">\n' +
            '       <md-icon md-menu-origin class="toggleArrow"></md-icon>\n' +
            '   </span>\n' +
            '</md-button>\n' +
            '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
            '  <li ng-repeat="page in section.pages">\n' +
            '    <menu-link section="page"></menu-link>\n' +
            '  </li>\n' +
            '</ul>\n' +
            '');
        $templateCache.put('partials/menu-link.tmpl.html',
            '<md-button ng-class="{\'{{section.icon}}\' : true}" ui-sref-active="active" \n' +
            '  ng-disabled="{{section.disabled}}" ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
            '  {{section | humanizeDoc}}\n' +
            '  <span  class="md-visually-hidden "\n' +
            '    ng-if="isSelected()">\n' +
            '    current page\n' +
            '  </span>\n' +
            '</md-button>\n' +
            '');
    }])
    .filter('nospace', function () {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    })
    .filter('humanizeDoc', function () {
        return function (doc) {
            if (!doc) return;
            if (doc.type === 'directive') {
                return doc.name.replace(/([A-Z])/g, function ($1) {
                    return '-' + $1.toLowerCase();
                });
            }

            return doc.label || doc.name;
        };
    })
    .directive('menuToggle', ['$timeout', function ($timeout ) {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'partials/menu-toggle.tmpl.html',
            link: function (scope, element) {
                var controller = scope.$parent;

                scope.isOpen = function () {
                    return controller.isOpen(scope.section);
                };
                scope.toggle = function () {
                    controller.toggleOpen(scope.section);
                };

                var parentNode = element[0].parentNode.parentNode.parentNode;
                if (parentNode.classList.contains('parent-list-item')) {
                    var heading = parentNode.querySelector('h2');
                    element[0].firstChild.setAttribute('aria-describedby', heading.id);
                }
            }
        };
    }])
    .directive('menuLink', function () {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'partials/menu-link.tmpl.html',
            link: function ($scope, $element) {
                var controller = $scope.$parent;

                $scope.focusSection = function () {
                    // set flag to be used later when
                    // $locationChangeSuccess calls openPage()
                    controller.autoFocusContent = true;
                };
            }
        };
    });