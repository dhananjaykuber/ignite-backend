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
  deleteQuiz,
} = require('../controllers/quizController');
const { adminAuth } = require('../middleware/adminMiddleware');

const router = express.Router();

// get answers
router.post('/get-answers/:category', getAnswers);

// get quiz
router.post('/get-quiz/:category', getQuiz);

// add quiz
router.post('/add-quiz/:category', adminAuth, addQuiz);

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
router.get('/get-entries/:category', adminAuth, getEntries);

// delete quiz
router.delete('/delete-quiz/:category', adminAuth, deleteQuiz);

module.exports = router;
