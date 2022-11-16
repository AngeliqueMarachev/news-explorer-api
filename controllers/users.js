const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const NoAuthError = require('../errors/noAuthError');
const DuplicateKeyError = require('../errors/duplicateKeyError');
const user = require('../models/user');

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('No users to display');
    }
    res.send({ data: user });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Invalid user ID'));
    }
    return next(err);
  });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new DuplicateKeyError("The user with the provided email already exists");
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name
    }))
    .then((user) => {
      const newUser = { name:user.name, email:user.email }
      res.status(201).send(newUser);
      })
    .catch((err) => {
      next(err);
    });
};

const { JWT_SECRET = 'secret-code' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(() => {
      next(new NoAuthError('Incorrect email or password'));
    });
};

module.exports = {
  getUserById,
  createUser,
  login,
}