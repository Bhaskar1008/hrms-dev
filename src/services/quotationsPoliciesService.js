import httpService from './httpService';
import config from '../config/api.config';

const BASE_URL = config.apiEndpoints.quotationsPolicies;

export const quotationsPoliciesService = {
  getAll: (params) => httpService.get(BASE_URL, params),
  // getById: (id) => httpService.get(`${BASE_URL}/${id}`),
  // create: (data) => httpService.post(BASE_URL, data),
  // update: (id, data) => httpService.put(`${BASE_URL}/${id}`, data),
  // delete: (id) => httpService.delete(`${BASE_URL}/${id}`)
};

export default quotationsPoliciesService;