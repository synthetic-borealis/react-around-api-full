const { messageStrings } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = messageStrings.unauthorized) {
    super(message);

    this.statusCode = 403;
  }
}

module.exports = UnauthorizedError;
