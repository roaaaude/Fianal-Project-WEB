import api from './api';

// Get user profile
export const getUserProfile = async () => {
  return api.get('/users/profile');
};

// Update user profile
export const updateUserProfile = async (userData) => {
  return api.put('/users/profile', userData);
};

// Change password
export const changePassword = async (passwordData) => {
  return api.put('/users/password', passwordData);
}; 