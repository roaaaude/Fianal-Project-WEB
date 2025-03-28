import api from './api';

// Get all items with query params (pagination, filtering, sorting)
export const getItems = async (params = {}) => {
  console.log('Sending params to API:', params);  // Debug log
  return api.get('/items', { params });
};

// Get items by specific category - direct method
export const getItemsByCategory = async (category, params = {}) => {
  console.log(`Getting items for category: ${category}`);
  return api.get(`/items`, { 
    params: { 
      category,
      ...params
    } 
  });
};

// Get featured items
export const getFeaturedItems = async (limit = 6) => {
  return api.get('/items/featured', { params: { limit } });
};

// Get item by ID
export const getItem = async (id) => {
  return api.get(`/items/${id}`);
};

// Search items
export const searchItems = async (query, params = {}) => {
  return api.get(`/items/search`, { 
    params: { 
      query,
      ...params
    } 
  });
};

// Admin functions - these will require admin authorization

// Create new item (admin only)
export const createItem = async (itemData) => {
  return api.post('/items', itemData);
};

// Update item (admin only)
export const updateItem = async (id, itemData) => {
  return api.put(`/items/${id}`, itemData);
};

// Delete item (admin only)
export const deleteItem = async (id) => {
  return api.delete(`/items/${id}`);
}; 