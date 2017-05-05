/**
 * Created by nbos on 3/14/16.
 *
 * vrathore, 3/14/16
 * always store accesstoken in cookies only.
 */
angular.module('mod.idn')
    .service('SessionService', ['ipCookie', 'APP_CONSTANTS', "MOD_NBOS", function(ipCookie, APP_CONSTANTS){

        var options = {
            domain : '.localnbos.in',
            expires : 48
        };

        this.setSession = function(session, uuid){
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", session.access_token, options);
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN", session.refresh_token, options);
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE", session.token_type, options);
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN", session.expires_in, options);
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE", session.scope, options);
            ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "UUID", uuid, options);
        };

        this.getSession = function(){
            var session = {};

            session.access_token = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", undefined, options);
            session.refresh_token = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN", undefined, options);
            session.token_type = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE", undefined, options);
            session.expires_in = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN", undefined, options);
            session.scope = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "SCOPE", undefined, options);
            session.uuid = ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "UUID", undefined, options);

            return session;
        };

        this.checkSession = function(){
            if(ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", undefined, options)){
                console.log("CHECKING SESSION TRUE");
                return true;
            } else {
                console.log("CHECKING SESSION FALSE");
                return false;
            };

        };

        this.checkSessionObject = function(){

        };

        this.getStoredUserToken = function(){
            return ipCookie(APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN", undefined, options);
        };

        this.deleteSession = function(){

            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "USER_ACCESS_TOKEN" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';
            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "REFRESH_TOKEN" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';
            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "TOKEN_TYPE" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';
            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "EXPIRES_IN" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';
            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "SCOPE" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';
            document.cookie = APP_CONSTANTS.APP_SESSION_KEY + "UUID" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=.local.com;';

        };

        return this;
    }]);
