const express = require('express');
const {
  addCategory,
  checkLive,
  getAllCaletgories,
  setLive,
} = require('../controllers/categoryController');

const router = express.Router();

// add new category
router.post('/:category', addCategory);

// get all categories
router.get('/get-all-categories', getAllCaletgories);

// check quiz is live
router.get('/check-live/:category', checkLive);

// set test live
router.put('/set-live/:category', setLive);

module.exports = router;
