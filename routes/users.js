const router = require('express').Router();

const { getUserById } = require('../controllers/users');

router.get('/me', getUserById);

module.exports = router;
