const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const { messageStrings } = require('../utils/constants');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.populate(card, { path: 'owner' })
        .then(() => {
          res.send({ data: card });
        });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError())
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        throw new UnauthorizedError();
      }

      Card.findByIdAndDelete(cardId)
        .then(() => {
          res.send({ message: messageStrings.cardDeleted });
        });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError())
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

const unlikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(new NotFoundError())
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
