const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: Number,
  questions: [String],
  live: Boolean,
  adminId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', categorySchema);
