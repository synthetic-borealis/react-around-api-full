const Card = require('../models/card');
const { messageStrings } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: messageStrings.serverError });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.populate(card, { path: 'owner' })
        .then(() => {
          res.send(card);
        });
    })
    .catch((error) => {
      switch (error.name) {
        case 'ValidationError':
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        default:
          res.status(500).send({ message: messageStrings.serverError });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        res.status(403).send({ message: messageStrings.unauthorized });
        return;
      }

      Card.findByIdAndDelete(cardId)
        .then(() => {
          res.send({ message: messageStrings.cardDeleted });
        });
    })
    .catch((error) => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        case 'DocumentNotFoundError':
          res.status(404).send({ message: messageStrings.notFound });
          break;

        default:
          res.status(500).send({ message: messageStrings.serverError });
      }
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail()
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        case 'DocumentNotFoundError':
          res.status(404).send({ message: messageStrings.notFound });
          break;

        default:
          res.status(500).send({ message: messageStrings.serverError });
      }
    });
};

const unlikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail()
    .populate('owner')
    .populate('likes')
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        case 'DocumentNotFoundError':
          res.status(404).send({ message: messageStrings.notFound });
          break;

        default:
          res.status(500).send({ message: messageStrings.serverError });
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
