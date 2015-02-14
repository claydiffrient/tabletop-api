
/**
 * A very simple and not very secure bit of security.
 * It's also not very scalable, but works for now.
 */
var requireAuthentication = function (req, res, next) {
  var token = req.query.token || req.headers['X-Access-Token'];

  if (token === process.env.ACCESS_TOKEN) {
    return next();
  }
  res.status(401).json({
      message: 'Authorization Failed',
      status: 401
  });

};

module.exports = requireAuthentication;