import api from './axiosInstance';

export const getUserProfile = () => api.get('/user/profile');
export const loadFunds = (data) => api.post('/user/load-funds', data);
export const updatePreferences = (data) => api.post('/user/update-preferences', data);

