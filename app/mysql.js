
var pkgname = require('../package').name;
var debug = require('debug')(pkgname + ':mysql');



exports = module.exports = function(app, config) {

  var mysql = app.mysql = require('mysql');

  app.mysqlPool = {};

  debug('Configuring mysql');
  Object.keys(config).forEach(function(database) {

    var conf = config[database];
    debug('Creating pool ' + database, conf);

    var pool = app.mysqlPool[database] = mysql.createPool(conf);
  });

};

