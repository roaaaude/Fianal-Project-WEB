const express = require('express');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favorite.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// All favorite routes are protected
router.get('/', protect, getFavorites);
router.post('/:itemId', protect, addFavorite);
router.delete('/:itemId', protect, removeFavorite);

module.exports = router; 