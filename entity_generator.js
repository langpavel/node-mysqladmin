/*
 * This file connects to database and create information_schema reflection
 * This file will be removed after project will be able to replace this work in core
 */


var config = require('config');
var mysql = require('mysql');


var protoClone = function(src) {
  var Clon = function() {};
  Clon.prototype = src;
  return new Clon();
};


var connection = new mysql.createClient(config.database);

var DbReflection = require('./node_modules/myorm/lib/db_reflection');

DbReflection.reflectAll(connection);