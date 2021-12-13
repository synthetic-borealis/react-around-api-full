const User = require('../models/user');
const { responseMessages } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: responseMessages.serverError });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ message: responseMessages.badRequest });
          break;

        case 'DocumentNotFoundError':
          res.status(404).send({ message: responseMessages.notFound });
          break;

        default:
          res.status(500).send({ message: responseMessages.serverError });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      switch (error.name) {
        case 'ValidationError':
          res.status(400).send({ message: responseMessages.badRequest });
          break;

        default:
          res.status(500).send({ message: responseMessages.serverError });
      }
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      switch (error.name) {
        case 'CastError':
          res.status(400).send({ message: responseMessages.badRequest });
          break;

        case 'DocumentNotFoundError':
          res.status(404).send({ message: responseMessages.notFound });
          break;

        default:
          res.status(500).send({ message: responseMessages.serverError });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      switch (error.name) {
        case 'ValidationError':
          res.status(400).send({ message: responseMessages.badRequest });
          break;

        case 'CastError':
          res.status(400).send({ message: responseMessages.badRequest });
          break;

        default:
          res.status(500).send({ message: responseMessages.serverError });
      }
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
