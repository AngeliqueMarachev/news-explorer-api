const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserById } = require('../controllers/users');

router.get(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({
        authorization: Joi.string().required(),
      })
      .unknown(true),
  }),
  getUserById
);

module.exports = router;
