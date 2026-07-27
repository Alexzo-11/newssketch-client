import api from './api';

export const getCategories = async () => {
  try {
    const res = await api.get('/categories', { timeout: 5000 });
    return res.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array instead of throwing
    return [];
  }
};

export const createCategory = async (data) => {
  try {
    const res = await api.post('/categories', data);
    return res.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await api.put(`/categories/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};