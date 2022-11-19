const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const NoAuthError = require('../errors/noAuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NoAuthError('You are not authorized to perform this action'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-code');

  } catch (err) {
    return next(new NoAuthError('You are not authorized to perform this action'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;