const express = require('express');
const {
  getQuiz,
  addQuiz,
  submitQuiz,
  increaseTime,
  endQuiz,
  getAnswers,
  getTime,
  calculateScores,
  getTotalTime,
  getEntries,
} = require('../controllers/quizController');

const router = express.Router();

// get answers
router.post('/get-answers/:category', getAnswers);

// get quiz
router.post('/get-quiz/:category', getQuiz);

// add quiz
router.post('/add-quiz/:category', addQuiz);

// submit quiz
router.post('/submit-quiz/:category', submitQuiz);

// increase time
router.post('/increase-time/:category', increaseTime);

// get time
router.post('/get-time/:category', getTime);

// end exam
router.post('/end-quiz/:category', endQuiz);

// calculate scores
router.post('/calculate-scores/:category', calculateScores);

// get time of quiz
router.get('/get-total-time/:category', getTotalTime);

// get all entries
router.get('/get-entries/:category', getEntries);

module.exports = router;
