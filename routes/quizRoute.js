const express = require('express');
const {
  getQuiz,
  addQuiz,
  submitQuiz,
  increaseTime,
  endQuiz,
} = require('../controllers/quizController');

const router = express.Router();

// get quiz
router.post('/get-quiz/:category', getQuiz);

// add quiz
router.post('/add-quiz/:category', addQuiz);

// submit quiz
router.post('/submit-quiz/:category', submitQuiz);

// increase time
router.post('/increase-time/:category', increaseTime);

// increase time
router.post('/end-quiz/:category', endQuiz);

module.exports = router;
