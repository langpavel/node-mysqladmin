
var nodemailer = require('nodemailer');



module.exports = function(app, config) {

  var mailer = nodemailer.createTransport('SMTP', config.mailer);

  app.sendMail = function(options, callback) {
    var key, keys = Object.keys(config.mailer.defaults || {});
    for (var i = 0, l = keys.length; i < l; i++) {
      if (!options[key = keys[i]])
        options[key] = config.mailer.defaults[key];
    }

    mailer.sendMail(options, callback);
  };

  app.sendMail.close = function(callback) {
    mailer.close(callback);
  }

};
