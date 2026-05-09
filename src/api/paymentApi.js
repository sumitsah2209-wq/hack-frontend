import api from './axiosInstance';

export const getTransactions = (userId) => api.get(`/transactions/${userId}`);
export const addTransaction = (data) => api.post('/transactions/add', data);
export const executePayment = (data) => api.post('/payment/execute', data);
export const getPaymentSchedules = (userId) => api.get(`/payment/schedule/${userId}`);
export const retryPayment = (data) => api.post('/payment/retry-payment', data);


