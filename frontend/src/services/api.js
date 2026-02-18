import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
};

export const usersAPI = {
  getAll: () => api.get('/users/'),
  getById: (id) => api.get(`/users/${id}/`),
  create: (data) => api.post('/users/', data),
  update: (id, data) => api.put(`/users/${id}/`, data),
  delete: (id) => api.delete(`/users/${id}/`),
};

export const resourcesAPI = {
  getAll: () => api.get('/resources/'),
  getById: (id) => api.get(`/resources/${id}/`),
  create: (data) => api.post('/resources/', data),
  update: (id, data) => api.put(`/resources/${id}/`, data),
  delete: (id) => api.delete(`/resources/${id}/`),
};

export const bookingsAPI = {
  getAll: () => api.get('/bookings/'),
  getById: (id) => api.get(`/bookings/${id}/`),
  create: (data) => api.post('/bookings/', data),
  update: (id, data) => api.put(`/bookings/${id}/`, data),
  approve: (id) => api.patch(`/bookings/${id}/update_status/`, { status: 'APPROVED' }), // Fixed endpoint to match ViewSet action
  reject: (id) => api.patch(`/bookings/${id}/update_status/`, { status: 'REJECTED' }), // Fixed endpoint to match ViewSet action
  delete: (id) => api.delete(`/bookings/${id}/`),
};

export default api;
