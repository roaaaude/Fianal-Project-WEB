const express = require('express');
const { getItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/item.controller');
const { protect, admin } = require('../middlewares/auth.middleware');
const { validateItem } = require('../middlewares/validation.middleware');

const router = express.Router();

// Public routes
router.get('/', getItems);
router.get('/:id', getItemById);

// Protected admin routes
// TEMPORARILY REMOVED ADMIN CHECK FOR TESTING
router.post('/', protect, validateItem, createItem);
router.put('/:id', protect, admin, updateItem);
router.delete('/:id', protect, admin, deleteItem);

module.exports = router; 