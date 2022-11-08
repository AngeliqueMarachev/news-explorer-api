const article = require('../models/article');
const Article = require('../models/article');

const getArticles = (req, res) => {
  Article.find({})
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => {
      res.send({ data: article }).catch((err) => {
        console.log(err);
      });
    });
};

const deleteArticle = (req, res) => {

};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
}