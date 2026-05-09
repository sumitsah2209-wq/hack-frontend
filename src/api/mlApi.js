import api from './axiosInstance';

export const checkMLHealth = () => api.get('/ml/health');
export const getMLInfo = () => api.get('/ml/info');
export const testML = (data) => api.post('/ml/test', data);
export const predictRecurring = (data) => api.post('/ml/predict/recurring', data);
export const getMLPredictions = (data) => api.post('/ml/predict/direct', data);
export const getHighConfidencePredictions = () => api.get('/ml/predictions/high-confidence');
