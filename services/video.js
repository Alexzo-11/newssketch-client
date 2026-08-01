import api from './api';

export const getVideos = async (params = {}) => {
  try {
    const res = await api.get('/videos', { params });
    return res.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], total: 0, totalPages: 1, currentPage: 1 };
  }
};

export const getVideo = async (id) => {
  try {
    const res = await api.get(`/videos/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

export const getFeaturedVideos = async () => {
  try {
    const res = await api.get('/videos/featured');
    return res.data;
  } catch (error) {
    console.error('Error fetching featured videos:', error);
    return [];
  }
};

export const uploadVideo = async (formData) => {
  try {
    console.log('📡 Uploading video...');
    const res = await api.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 300000,
    });
    console.log('✅ Video uploaded:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error uploading video:', error.response?.data || error.message);
    throw error;
  }
};

export const addYouTubeVideo = async (data) => {
  try {
    console.log('📡 Adding YouTube video:', data);
    const res = await api.post('/videos/youtube', data, {
      timeout: 30000,
    });
    console.log('✅ YouTube video added:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error adding YouTube video:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteVideo = async (id) => {
  try {
    const res = await api.delete(`/videos/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

export const updateVideo = async (id, data) => {
  try {
    const res = await api.put(`/videos/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating video:', error);
    throw error;
  }
};