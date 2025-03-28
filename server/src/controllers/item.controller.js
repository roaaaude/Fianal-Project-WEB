const Item = require('../models/item.model');

/**
 * @desc    Get all items
 * @route   GET /api/items
 * @access  Public
 */
const getItems = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields', 'search', 'sortBy', 'order'];
    excludedFields.forEach((field) => delete queryObj[field]);
    
    // Debug logging
    console.log('Raw query:', req.query);
    console.log('Processed query params after exclusions:', queryObj);
    
    // Convert string numbers to actual numbers for MongoDB comparison
    if (queryObj.minPrice) queryObj.price = { $gte: Number(queryObj.minPrice) };
    if (queryObj.maxPrice) queryObj.price = { ...queryObj.price, $lte: Number(queryObj.maxPrice) };
    if (queryObj.minRating) queryObj.rating = { $gte: Number(queryObj.minRating) };
    
    // Remove the original string parameters
    delete queryObj.minPrice;
    delete queryObj.maxPrice;
    delete queryObj.minRating;
    
    // Ensure category is handled properly (case insensitive if needed)
    if (queryObj.category) {
      console.log(`Filtering by category: ${queryObj.category}`);
      // Use exact match for category
      queryObj.category = queryObj.category.toLowerCase();
    }
    
    // Final query object for MongoDB
    console.log('Final MongoDB query:', queryObj);
    
    // Search functionality
    let query;
    if (req.query.search) {
      query = Item.find({
        $text: { $search: req.query.search },
        ...queryObj  // Preserve other filters like category
      });
    } else {
      query = Item.find(queryObj);
    }

    // Sorting
    if (req.query.sortBy) {
      const sortField = req.query.sortBy === 'featured' ? 'rating' : req.query.sortBy;
      const sortOrder = req.query.order === 'asc' ? 1 : -1;
      
      const sortObj = {};
      sortObj[sortField] = sortOrder;
      console.log('Sorting by:', sortObj);
      
      query = query.sort(sortObj);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    // Execute query
    const items = await query;
    console.log(`Found ${items.length} items matching the criteria:`, 
      items.map(item => `${item.title} (${item.category})`));

    // Count total documents for pagination info
    const totalItems = await Item.countDocuments(queryObj);

    res.status(200).json({
      success: true,
      count: items.length,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      data: items,
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching items',
      error: error.message,
    });
  }
};

/**
 * @desc    Get item by ID
 * @route   GET /api/items/:id
 * @access  Public
 */
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching item',
      error: error.message,
    });
  }
};

/**
 * @desc    Create new item
 * @route   POST /api/items
 * @access  Private/Admin
 */
const createItem = async (req, res) => {
  try {
    // TEMPORARY: Skip admin check for testing
    // Add the creator of the item if user exists in request
    if (req.user) {
      req.body.createdBy = req.user._id;
    }

    console.log('Creating new item:', req.body);
    const item = await Item.create(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating item',
      error: error.message,
    });
  }
};

/**
 * @desc    Update item
 * @route   PUT /api/items/:id
 * @access  Private/Admin
 */
const updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    // Update and return the updated item
    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating item',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete item
 * @route   DELETE /api/items/:id
 * @access  Private/Admin
 */
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting item',
      error: error.message,
    });
  }
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}; 