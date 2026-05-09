import api from './axiosInstance';

export const getSchedules = (userId) => api.get(`/payment/schedule/${userId}`);
export const createSchedule = (data) => api.post('/payment/schedule', data);
export const updateSchedule = (id, data) => api.put(`/payment/schedule/${id}`, data);
export const deleteSchedule = (id) => api.delete(`/payment/schedule/${id}`);
export const getScheduleHistory = (userId) => api.get(`/payment/schedule/${userId}/history`);
