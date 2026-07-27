import api from './api';

export const getPosts = async (params) => {
  try {
    const res = await api.get('/posts', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0, totalPages: 1, currentPage: 1 };
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const res = await api.get(`/posts/${slug}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const res = await api.get(`/posts/id/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};

export const createPost = async (data) => {
  try {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const res = await api.post('/posts', data, config);
    return res.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (id, data) => {
  try {
    const config = data instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    const res = await api.put(`/posts/id/${id}`, data, config);
    return res.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const res = await api.delete(`/posts/id/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const searchPosts = async (q) => {
  try {
    const res = await api.get(`/search?q=${q}`);
    return res.data;
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};

export const getRelatedPosts = async (categoryId, currentId) => {
  try {
    const res = await api.get(`/posts/related?category=${categoryId}&exclude=${currentId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

export const getPostsByCategory = async (slug) => {
  try {
    const res = await api.get(`/categories/${slug}/posts`);
    return res.data;
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return { category: null, posts: [] };
  }
};

export const getDashboardStats = async () => {
  try {
    const res = await api.get('/admin/stats');
    return res.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { 
      posts: 0, 
      views: 0, 
      comments: 0, 
      visitors: 0, 
      mostRead: [], 
      categories: [], 
      chartData: { views: [] } 
    };
  }
};