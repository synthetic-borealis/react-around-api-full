const { messageStrings } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = messageStrings.notFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
