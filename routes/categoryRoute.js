const express = require('express');
const {
  addCategory,
  checkLive,
  getAllCaletgories,
  setLive,
  getQuestions,
  calculateResult,
} = require('../controllers/categoryController');

const router = express.Router();

// add new category
router.post('/:category', addCategory);

// get all categories
router.get('/get-all-categories', getAllCaletgories);

// check quiz is live
router.get('/check-live/:category', checkLive);

// get questions
router.get('/get-questions/:category', getQuestions);

// set test live
router.put('/set-live/:category', setLive);

// calculate final result
router.get('/calculate-result/:category', calculateResult);

module.exports = router;
