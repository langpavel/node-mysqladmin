
var debug = require('debug')('app:routes:login');



module.exports = function(app) {

  var render = function(template) {
    return function(req, res) {
      res.render(template);
    }
  };

  var login_post = function(req, res, next) {

    debug('req.body', req.body);

    var email = req.body.email;
    var password = req.body.pass;
    var remember = !!req.body.remember;
    delete req.body.pass;

    var isError = function(err) {
      if (err) {
        res.locals.loginError = 'Neočekávaná chyba při pokusu o přihlášení';
        debug('Login error for "' + email + '"', err);
        res.render('login');
        return true;
      }
      return false;
    };

    app.model.User.findOneByEmail(email, function(err, user) {
      if (isError(err)) return;

      if (!user) {
        res.locals.loginError = 'Neplatný email nebo heslo';
        debug('Login (findOneByEmail) error for "' + email + '"', err);
        return res.render('login');
      }

      user.validatePassword(password, function(err, valid) {
        if (isError(err)) return;

        if (!valid) {
          res.locals.loginError = 'Neplatný email nebo heslo';
          //debug('Invalid password', err);
          return res.render('login');
        }

        req.session.regenerate(function(err) {
          if (err) return next(err);

          if (remember) {
            req.session.cookie.maxAge = 3600000 /*hour*/ * 24 * 60;
          } else {
            req.session.cookie.maxAge = null; // when browser is closed
          }

          req.session.user = user;
          res.redirect(303, '/');
        });

      });

    });
  };

  var redirectIfLoggedIn = function(req, res, next) {
    if (req.session.user.loggedIn) {
      req.flash('info', 'Byl jste přesměrován z přihlašovací stránky, ' +
          'protože jste již přihlášen !');
      return res.redirect('/logout');
    }
    return next();
  };

  var redirectIfNotLoggedIn = function(req, res, next) {
    if (!req.session.user.loggedIn) {
      req.flash('info', 'Byl jste přesměrován z odhlašovací stránky, ' +
          'protože nejste přihlášen !');
      return res.redirect('/login');
    }
    return next();
  };

  app.get('/login', redirectIfLoggedIn, render('login'));
  app.get('/registrace', function(req, res) {
    res.redirect('/login#registrace');
  });
  app.post('/login', login_post);

  // logout
  app.get('/logout', redirectIfNotLoggedIn, render('logout'));
  app.post('/logout', function(req, res, next) {
    req.session.regenerate(function(err) {
      if (err) return next(err);
      req.session.user = app.model.User.anonymous();
      req.flash('info', 'Byl jste odhlášen !');
      res.redirect(303, '/');
    });
  });

};
