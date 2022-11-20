require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

// middleware
const { requestLogger, errorLogger } = require('./middleware/logger');
const error = require('./middleware/error');

const NotFoundError = require('./errors/notFoundError');

const mainRoute = require('./routes/index')

const { PORT = 3000 } = process.env;
const app = express();

const {
  MONGO_URL = 'mongodb://localhost:27017/news',
  NODE_ENV,
} = process.env;

  mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/news');

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', mainRoute);

app.use('*', function(req, res, next){
  next(new NotFoundError('Requested resource not found'))
});

app.use(errorLogger);

// celebrate error handler
app.use(errors());

// middleware
app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
