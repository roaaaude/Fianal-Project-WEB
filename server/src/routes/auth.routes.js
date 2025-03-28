const express = require('express');
const { register, login, getUserProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validateUser, validateLogin } = require('../middlewares/validation.middleware');

const router = express.Router();

// Public routes
router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', protect, getUserProfile);

module.exports = router; 