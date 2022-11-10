const router = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
// const { create } = require('../models/user');

router.get('/', getArticles); // /articles
router.post('/', createArticle); // /articles
router.delete('/:articleId', deleteArticle); // /articles/articleId

module.exports = router;