import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.apiEndpoints.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const quotationsService = {
  getQuotations: (params) => api.get('/quotations', { params }),
  createQuotation: (data) => api.post('/quotations', data),
  updateQuotation: (id, data) => api.put(`/quotations/${id}`, data),
  deleteQuotation: (id) => api.delete(`/quotations/${id}`)
};

export const policiesService = {
  getPolicies: (params) => api.get('/policies', { params }),
  createPolicy: (data) => api.post('/policies', data),
  updatePolicy: (id, data) => api.put(`/policies/${id}`, data),
  deletePolicy: (id) => api.delete(`/policies/${id}`)
};

export default api;