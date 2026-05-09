import api from './axiosInstance';

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const logoutUser = () => {
  localStorage.removeItem('esewa_token');
  return Promise.resolve({ success: true });
};

export const validateToken = () => {
  const token = localStorage.getItem('esewa_token');
  return token ? Promise.resolve({ success: true, token }) : Promise.reject({ success: false, message: 'No token found' });
};
