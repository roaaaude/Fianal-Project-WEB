import api from './api';

// Login
export const login = async (credentials) => {
  return api.post('/auth/login', credentials);
};

// Register
export const register = async (userData) => {
  return api.post('/auth/register', userData);
};

// Logout - client-side only
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from token
export const getCurrentUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch (error) {
    return null;
  }
};

// Validate token
export const validateToken = async () => {
  return api.get('/auth/validate');
};

// Save token and user data to localStorage
export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}; 