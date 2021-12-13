const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { messageStrings, tempSecretKey } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: messageStrings.serverError });
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

const createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.send(user);
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
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        case 'CastError':
          res.status(400).send({ message: messageStrings.badRequest });
          break;

        default:
          res.status(500).send({ message: messageStrings.serverError });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, tempSecretKey);

      res.send({ token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
