import api from './api';

export const uploadImage = (data) => api.post('/upload', data).then(res => res.data);