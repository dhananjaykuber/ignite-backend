const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
    default: 0,
  },
  submitted: {
    type: Boolean,
    required: true,
    default: false,
  },
  questions: [String],
  answers: [String],
});

module.exports = mongoose.model('User', userSchema);
