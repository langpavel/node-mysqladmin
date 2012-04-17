/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');

var config = null;
try {
  // this applies to config up to application using this module
  config = require('../../config');
} catch(err) {
  try {
    // this is for local config
    config = require('./config');
  } catch(err) {
    try {
      config = require('./config.sample.json');
      console.warn('mysqladmin: using sample configuration');
    } catch(err) {
      console.error('this is wrong...');
    }
  }
}
if(config === null) {
  console.error('mysqladmin: cannot load configuration');
}



var app = module.exports = exports = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);



if(require.main === module) {
  console.info("mysqladmin: module called as main. Running server...");
  http.createServer(app).listen(3303, "127.0.0.1", function(){
    console.info("mysqladmin: listening on 127.0.0.1:3303");
  });
}
