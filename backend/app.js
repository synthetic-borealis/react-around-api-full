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
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const { messageStrings } = require('./utils/constants');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const error = require('./middleware/error');

require('dotenv').config();

const { PORT = 3000 } = process.env;
const app = express();

app.options('*', cors());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // per 15 minutes
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

const sendNotFoundMessage = (req, res, next) => {
  res.status(404).send({ message: messageStrings.notFound });
  next();
};

app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
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
app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.use('/users', auth, users);
app.use('/cards', auth, cards);
app.use(sendNotFoundMessage);
app.use(errors());
app.use(error);

app.listen(PORT, () => {});
