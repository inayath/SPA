'use strict';

angular.module('app.layout')

.factory('AppLayoutService', ['$state', '$q', function($state, $q){

    var factory = {};

    factory.nav;
    factory.headerNav;

    factory.createHeader = function(){

    };

    factory.createMenu = function(){

        var deferred = $q.defer();

        try{
            //construct menu

            var links = $state.get(),
                nav = [],
                old_nav = [],
                header = [],
                found = false;
            
            for(var i =0; i<links.length; i++) {

                if(links[i].data && links[i].data.type){
                    if(links[i].data.type === 'nav'){
                        nav.push(links[i].data);
                    } else if(links[i].data.type === 'header'){
                        header.push(links[i].data);
                    }
                }
            };

            header.sort(function(a,b){
                if(a.position > b.position){
                    return 1;
                };
            });

            for(var i =0; i<links.length; i++){
                found = false;
                for(var j=0; j<old_nav.length; j++){
                    if(links[i].data && links[i].data.menu && links[i].data.module && old_nav[j].name === links[i].data.module){
                        var page = {};
                        page.name = links[i].data.name;
                        page.disabled = links[i].data.disabled;
                        page.type = "link";
                        page.icon = "";
                        page.state = links[i].name;

                        old_nav[j].pages.push(page);
                        found = true;
                    }
                };
                if(!found && links[i].data && links[i].data.menu && links[i].data.module){
                    var obj = {};
                    obj.name = links[i].data.module;
                    obj.type = "toggle";
                    obj.pages =[];
                    var page = {};
                    page.name = links[i].data.name;
                    page.disabled = links[i].data.disabled;
                    page.type = "link";
                    page.icon = "";
                    page.state = links[i].name;

                    obj.pages.push(page);

                    old_nav.push(obj);
                };
            };

            //

            var new_nav = {
                sections : old_nav,
                toggleSelectSection: function (section) {
                    new_nav.openedSection = (new_nav.openedSection === section ? null : section);
                },
                isSectionSelected: function (section) {
                    return new_nav.openedSection === section;
                },

                selectPage: function (section, page) {
                    page && page.url && $location.path(page.url);
                    new_nav.currentSection = section;
                    new_nav.currentPage = page;
                }
            };

            factory.nav = new_nav;
            factory.headerNav = header;

            deferred.resolve();
        } catch(error){
            deferred.reject(error);
        };

        return deferred.promise;

    };

    return factory;

}]);