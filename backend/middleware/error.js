const { messageStrings } = require('../utils/constants');

const error = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: messageStrings.serverError });
  }
};

module.exports = error;
