const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    validate: {
      validator(value) {
        return validator.isStrongPassword(value);
      },
      message: 'Invalid password',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);