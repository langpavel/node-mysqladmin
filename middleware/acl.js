/*
module.exports = acl;



function acl(permission) {
  return function aclMiddleware(req, res, next) {
    var user = req.session.user;
    if (user.hasPermission(permission))
      return next();

    if (user.id) {
      // TODO generalize and optimize
      // it is possible that user loaded from session is outdated.
      // we try reload it from database and check permission again
      req.app.model.User.findById(user.id, function(error, user) {
        if (error) return next(error);

        req.session.user = user;

        if (user.hasPermission(permission))
          return next();

        res.send(403, 'Nemáte oprávnění prohlížet tuto stránku');
      });
    } else {
      res.send(403, 'Nemáte oprávnění prohlížet tuto stránku');
    }

  };
}
*/