const Favorite = require('../models/favorite.model');
const Item = require('../models/item.model');
const User = require('../models/user.model');

/**
 * @desc    Get all favorites for a user
 * @route   GET /api/favorites
 * @access  Private
 */
const getFavorites = async (req, res) => {
  try {
    // Find all favorites for the current user
    const favorites = await Favorite.find({ user: req.user._id }).populate('item');

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching favorites',
      error: error.message,
    });
  }
};

/**
 * @desc    Add item to favorites
 * @route   POST /api/favorites/:itemId
 * @access  Private
 */
const addFavorite = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Check if item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      item: itemId,
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: 'Item already in favorites',
      });
    }

    // Create new favorite
    const favorite = await Favorite.create({
      user: req.user._id,
      item: itemId,
    });

    // Add to user's favorites array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { favorites: itemId } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to favorites',
      error: error.message,
    });
  }
};

/**
 * @desc    Remove item from favorites
 * @route   DELETE /api/favorites/:itemId
 * @access  Private
 */
const removeFavorite = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Find the favorite
    const favorite = await Favorite.findOne({
      user: req.user._id,
      item: itemId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in favorites',
      });
    }

    // Remove favorite
    await favorite.deleteOne();

    // Remove from user's favorites array
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: itemId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Item removed from favorites',
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from favorites',
      error: error.message,
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
}; 