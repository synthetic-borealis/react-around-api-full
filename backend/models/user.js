const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { urlRegex } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Wrong email format',
    },
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
