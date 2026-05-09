import api from './axiosInstance';

export const getNotifications = (userId) => api.get(`/notifications/${userId}`);
export const markAsRead = (id) => api.put(`/notifications/${id}/read`);
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);
