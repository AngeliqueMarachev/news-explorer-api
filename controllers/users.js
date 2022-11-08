const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const NoAuthError = require('../errors/noAuthError');
const DuplicateKeyError = require('../errors/duplicateKeyError');

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('No user with matching ID');
    })
    .then((selectedUser) => res.status(200).send(selectedUser))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
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
    }))
    .then((user) => {
      const { password, ...userObj } = user.toObject()
      res.status(201).send(userObj);
      })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res) => {
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