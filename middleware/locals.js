
module.exports = function(app) {

  return function localsMiddleware(req, res, next) {
    res.locals.body = req.body || {};
    res.locals.req = req;
    return next();
  };

};
