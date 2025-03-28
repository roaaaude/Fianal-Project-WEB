import api from './api';

// Get all favorites for the authenticated user
export const getFavorites = async () => {
  return api.get('/favorites');
};

// Add an item to favorites
export const addFavorite = async (itemId) => {
  return api.post(`/favorites/${itemId}`);
};

// Remove an item from favorites
export const removeFavorite = async (itemId) => {
  return api.delete(`/favorites/${itemId}`);
};

// Check if an item is in favorites
export const checkFavorite = async (itemId) => {
  return api.get(`/favorites/check/${itemId}`);
}; 