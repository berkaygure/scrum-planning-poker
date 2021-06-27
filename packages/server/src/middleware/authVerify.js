var jwt = require('jsonwebtoken');
const config = require('../config');

const authVerify = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ errors: [{ unauthenticated: 'Unauthorized!' }] });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ errors: [{ unauthenticated: 'Unauthorized!' }] });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authVerify;
