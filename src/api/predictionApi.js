import api from './axiosInstance';

export const getDashboardAnalytics = (userId) => api.get(`/analytics/dashboard/${userId}`);
export const getPredictions = (userId) => api.get('/predictions', { params: { userId } });
export const getWalletForecast = (userId) => api.get('/predictions/forecast', { params: { userId } });

