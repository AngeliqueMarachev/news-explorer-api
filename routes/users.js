const router = require('express').Router();

const { getUserById } = require('../controllers/users');

router.get('/me', getUserById); // /users/me

module.exports = router;
