const { messageStrings } = require('../utils/constants');

class BadCredentialsError extends Error {
  constructor(message = messageStrings.badCredentials) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = BadCredentialsError;
