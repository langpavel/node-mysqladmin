
module.exports = function(app) {

  return function flashMiddleware(req, res, next) {
    req.flash = function(type, msg) {
      var flashes = req.session.flashes || (req.session.flashes = []);
      if (typeof type === 'object')
        flashes.push(type);
      else
        flashes.push({
          type: msg ? type : 'info',
          msg: msg || type
        });
    };

    res.locals.getFlashes = function() {
      var result = req.session.flashes || [];
      req.session.flashes = [];
      return result;
    };

    return next();
  };

};
