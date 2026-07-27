import api from './api';

export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data;
  } catch (error) {
    // Silently handle 401 - user is not logged in
    if (error.response?.status === 401) {
      return null;
    }
    console.error('Get current user error:', error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};