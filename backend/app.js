const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { responseMessages } = require('./utils/constants');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb');

const sendNotFoundMessage = (req, res, next) => {
  res.status(404).send({ message: responseMessages.notFound });
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

app.use('/users', users);
app.use('/cards', cards);
app.use(sendNotFoundMessage);

app.listen(PORT, () => {});
