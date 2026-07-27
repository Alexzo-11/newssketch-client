import api from './api';

export const getComments = async (postId) => {
  try {
    console.log('📡 Fetching comments for post:', postId);
    const res = await api.get('/comments', { 
      params: { post: postId } 
    });
    console.log('✅ Comments response:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error in getComments:', error);
    // Return empty array instead of throwing for 404
    if (error.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const addComment = async (data) => {
  try {
    console.log('📡 Adding comment:', data);
    const res = await api.post('/comments', data);
    console.log('✅ Comment added:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error in addComment:', error);
    throw error;
  }
};