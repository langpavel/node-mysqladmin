
var debug = require('debug')('middleware:auth');



module.exports = function(app) {
  return function auth(req, res, next) {
    app.mysqlPool.bss.createConnection(function(err, bss) {
      if (err) return next(err);
      bss.
    });
  };
}
