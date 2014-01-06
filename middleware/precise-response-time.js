

module.exports = function() {
  return function preciseResponseTime(req, res, next) {
    var start = process.hrtime();

    if (res._responseTime) return next();
    res._responseTime = true;

    res.on('header', function() {
      var duration = process.hrtime(start);
      res.setHeader('X-Response-Time', duration[0] + 's' +
                    (duration[1] / 1000000).toString().replace('.', 'ms'));
    });

    next();
  };
};
