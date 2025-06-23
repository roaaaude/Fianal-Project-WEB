const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser, updateProfile } = require('../controllers/user.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Admin routes
router.get('/', protect, admin, getUsers);

// User profile update route (must be before /:id route)
router.route('/profile')
  .get(protect, (req, res) => res.status(501).json({ message: 'Not implemented here, see /api/auth/profile' }))
  .put(protect, updateProfile);

// Mixed routes (some admin only, some user)
router.route('/:id')
  .get(protect, getUserById)
  .put(protect, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router; 