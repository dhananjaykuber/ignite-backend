const express = require('express');
const {
  addCategory,
  checkLive,
  getAllCaletgories,
  setLive,
  getQuestions,
  calculateResult,
} = require('../controllers/categoryController');
const { adminAuth } = require('../middleware/adminMiddleware');

const router = express.Router();

// add new category
router.post('/:category', adminAuth, addCategory);

// get all categories
router.get('/get-all-categories', adminAuth, getAllCaletgories);

// check quiz is live
router.get('/check-live/:category', checkLive);

// get questions
router.get('/get-questions/:category', getQuestions);

// set test live
router.put('/set-live/:category', adminAuth, setLive);

// calculate final result
router.get('/calculate-result/:category', adminAuth, calculateResult);

module.exports = router;
