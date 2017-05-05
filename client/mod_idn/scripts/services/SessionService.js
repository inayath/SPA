/**
 * Created by nbos on 3/14/16.
 *
 * vrathore, 3/14/16
 * always store accesstoken in cookies only.
 */
angular.module('mod.idn')
    .service('SessionService', ['localStorageService', 'APP_CONSTANTS', function(localStorageService, APP_CONSTANTS){

        this.setSession = function(session, uuid){
            if(localStorageService.isSupported){
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", session.access_token);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", session.access_token);
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN", session.refresh_token);
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE", session.token_type);
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN", session.expires_in);
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE", session.scope);
                localStorageService.set(APP_CONSTANTS.APP_SESSION_KEY + "UUID", uuid);
            } else {
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", session.access_token);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN", session.refresh_token);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE", session.token_type);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN", session.expires_in);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE", session.scope);
                localStorageService.cookie.set(APP_CONSTANTS.APP_SESSION_KEY + "UUID", uuid);
            }
        };

        this.getSession = function(){
            var session = {};

            if(localStorageService.isSupported){
                session.access_token = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN");
                session.refresh_token = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN");
                session.token_type = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE");
                session.expires_in = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN");
                session.scope = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE");
                session.uuid = localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "UUID");
            } else {
                session.access_token = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN");
                session.refresh_token = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN");
                session.token_type = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE");
                session.expires_in = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN");
                session.scope = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE");
                session.uuid = localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "UUID");
            }

            return session;
        };

        this.checkSession = function(){
            if(localStorageService.isSupported) {
                if(localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN")){
                    return true;
                } else {
                    return false;
                };
            } else {
                if(localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN")){
                    return true;
                } else {
                    return false;
                };
            }

        };

        this.checkSessionObject = function(){
            
        };

        this.getStoredUserToken = function(){
            if(localStorageService.isSupported) {
                return localStorageService.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN");
            } else {
                return localStorageService.cookie.get(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN");
            }
        };

        this.deleteSession = function(){

            if(localStorageService.isSupported){
                localStorageService.clearAll();
            };

            localStorageService.cookie.clearAll();
        };

        return this;
    }]);
