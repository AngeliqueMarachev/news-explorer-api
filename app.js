require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

// middleware
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/news');

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const NotFoundError = require('./errors/notFoundError');

//routes
const users = require('./routes/users')
const articles = require('./routes/articles');
const signin = require('./routes/signin');
const signup = require('./routes/signup');

app.use(requestLogger);

app.use('/signin', signin);
app.use('/signup', signup);

app.use(errorLogger);

app.use(auth);

app.use('/users', users);
app.use('/articles', articles);

app.use('*', function(req, res, next){
  next(new NotFoundError('Requested resource not found'))
});

// celebrate error handler
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
