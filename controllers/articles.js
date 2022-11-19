const Article = require('../models/article');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequest');
const ForbiddenError = require('../errors/forbiddenError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => article.populate('owner'))
    .then((article) => {
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Invalid inputs'));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {

  Article.findById(req.params.articleId)
    .orFail()
    .then((article) => {
      if (!(article.owner.toString() === req.user._id)) {
        throw new ForbiddenError('Action forbidden');
      }

      Article.findByIdAndDelete(req.params.articleId)
        .orFail()
        .then((deletedCard) => {
          res.send({ data: deletedCard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError('Invalid articleId'));
          }
          if (err.name === 'DocumentNotFoundError') {
            return next(new NotFoundError('Article not found'));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid articleId'));
      }
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Article not found'));
      }
      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
