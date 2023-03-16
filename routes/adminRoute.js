const express = require('express');
const { login, signup, resetTest } = require('../controllers/adminController');
const { adminAuth } = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.delete('/reset-test/:id', adminAuth, resetTest);

module.exports = router;
