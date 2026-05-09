import api from './axiosInstance';

export const getRecurringPayments = (userId) => api.get(`/recurring/${userId}`);
export const detectRecurring = (data) => api.post('/recurring/detect', data);
export const enableAutopay = (data) => api.post('/recurring/enable-autopay', data);
