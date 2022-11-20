const mongoose = require('mongoose');
// const validateUrl = require('../middleware/linkValidation');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
         // validateUrl(value);
        return /(http:\/\/|https:\/\/)[www.]?[a-zA-z0-9.]+\/?#?/i.test(value);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        // validateUrl(value);
        return /(http:\/\/|https:\/\/)[www.]?[a-zA-z0-9.]+\/?#?/i.test(value);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('article', articleSchema);
