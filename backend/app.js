const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {
  celebrate,
  Joi,
  Segments,
  errors,
} = require('celebrate');

const { messageStrings } = require('./utils/constants');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

const sendNotFoundMessage = (req, res, next) => {
  res.status(404).send({ message: messageStrings.notFound });
  next();
};

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    // _id: 'longFurby',
    _id: '61a4a152c6b4bc521792c492',
  };
  next();
});

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), createUser);
app.post('/signin', login);

app.use('/users', users);
app.use('/cards', cards);
app.use(sendNotFoundMessage);
app.use(errors());

app.listen(PORT, () => {});
