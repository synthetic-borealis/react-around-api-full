const jwt = require('jsonwebtoken');
const { messageStrings, secretKey } = require('../utils/constants');

const handleAuthError = (res) => res.status(403).send({ message: messageStrings.unauthorized });

const extractBearerToken = (header) => header.replace('Bearer ', '');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;
  return next();
};

module.exports = auth;
