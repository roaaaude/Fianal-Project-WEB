const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Admin routes
router.get('/', protect, admin, getUsers);

// Mixed routes (some admin only, some user)
router.route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router; 