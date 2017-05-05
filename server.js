
/**
 * Module dependencies.
 */

var express         = require('express'),
  routes            = require('./routes'),
  pageNotFound      = require('./pageNotFound'),
  http              = require('http'),
  path              = require('path'),
  morgan            = require('morgan'),
  favicon           = require('serve-favicon'),
  errorhandler      = require('errorhandler'),
  serveStatic       = require('serve-static');

var app = express();

// all environments
app.set('port', process.env.PORT || 9001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(favicon(__dirname + '/client/assets/favicon/favicon.ico'));
app.use(morgan('dev'));
app.use(serveStatic(__dirname + '/client'));
app.use('/site', serveStatic(__dirname + '/website'));

// development only
if (process.env.NODE_ENV === 'development') {

  app.use(errorhandler());

};

//For the Angular App
app.get('/', routes.index);

//For Other Routes
app.get('*', pageNotFound.index);

var args = process.argv;
var index_env = args.indexOf('--env');

try {

    var env = args[index_env + 1];
    
    if(env === "dev" || env === "prod"){
        process.env.APP_ENV = env;
    } else {
        console.log("Possible --env values : dev/prod");
    }

} catch (error){
    console.log("No environment specified.");
};

if(process.env.APP_ENV){

    app.listen(app.get('port'), function(){
        console.log(`Express server listening on ${process.env.APP_ENV} environment on port ${app.get('port') }`);
    });

} else {
    console.log("Server not started.");
};



