const NotFoundError = require('../errors/not-found-err');

const notFoundRoutes = (req, res, next) => {
  next(new NotFoundError());
};

module.exports = notFoundRoutes;
