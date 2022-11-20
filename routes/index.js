const router = require('express').Router();
const auth = require('../middleware/auth');

const users = require('./users')
const articles = require('./articles');
const signin = require('./signin');
const signup = require('./signup');
const { route } = require('./users');

router.use('/signin', signin);
router.use('/signup', signup);

router.use(auth);

router.use('/users', users);
router.use('/articles', articles);

module.exports = router;