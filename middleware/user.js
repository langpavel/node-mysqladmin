
module.exports = function(app) {
  var User = app.model.User;

  return function userMiddleware(req, res, next) {
    var user = req.session.user;
    // regenerate user mongoose model
    if (user && user._id) {
      req.session.user = res.locals.user = new User(user);
    } else {
      req.session.user = res.locals.user = User.anonymous();
    }

    // expose session to views
    Object.defineProperty(res.locals, 'session', {
      get: function() { return req.session; },
      set: function() { throw new Error('session is read only'); },
      configurable: true,
      enumerable: true
    });

    next();
  };
};
