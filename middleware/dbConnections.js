/*
    requires session middleware,
    req.session.dbConnections = [{}]
 */
var pool;



function createConnection(params) {
  var driver = require(params.driver || 'mysql');
  return driver.createClient(params);
}



var = module.exports = exports = function(options) {
  var opts = options || {};

  opts.createConnection = opts.createConnection || createConnection;

  return function(req, res, next) {
    req.dbConnections = [];
    if(Array.isArray(req.session.dbConnections)) {
      var i, dbConnections = req.session.dbConnections, l = dbConnections.length;
      var dbConnection, name;
      for(i=0; i<l; i++) {
        dbConnection = dbConnections[i];
        name = [dbConnection.driver
          , ':', dbConnection.user
          , '@', dbConnection.host
          , ':', dbConnection.port
          , '/', dbConnection.database].join('');
        if(pool[name]) {
          req.dbConnections.push(pool[name]);
        } else {
          req.dbConnections.push(pool[name] = opts.createConnection(dbConnection));
        }
      }
    }
  };
}



pool = exports.connectionPool;
