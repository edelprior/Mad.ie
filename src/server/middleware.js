const jwt = require('jsonwebtoken');
const secret = 'secret';

const withAuth = function(req, res, next) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;
  console.log(req.body.token);
  console.log(req.query.token);
  console.log(req.headers['x-access-token']);
  console.log(req.cookies.token);

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = withAuth;
