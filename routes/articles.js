const router = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
// const { create } = require('../models/user');

router.get('/', getArticles);
router.post('/', createArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;