const jwt = require('jsonwebtoken');
const config = require('../config');

const authVerify = (req, res, next) => {
  const authorization = req.headers.authorization || '';

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).send({ errors: [{ unauthenticated: 'unauthenticated!' }] });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ errors: [{ unauthenticated: 'unauthenticated!' }] });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authVerify;
