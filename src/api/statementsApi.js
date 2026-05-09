import api from './axiosInstance';

export const getPaymentHistory = (userId, filter = 'all') =>
  api.get(`/payment/history/${userId}?filter=${filter}`);
