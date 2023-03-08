const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [String],
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
