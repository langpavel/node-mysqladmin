
var debug = require('debug')('app:routes:privateStats');
var acl = require('../middleware/acl');



module.exports = function(app) {

  var render = function(template) {
    return function(req, res) {
      res.render(template);
    }
  };

  app.get('/private/stats', acl('stats'), render('private/stats'));

};
