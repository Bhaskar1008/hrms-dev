import axios from 'axios';
import config from '../config/api.config';

const instance = axios.create({
  baseURL: config.apiEndpoints.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const httpService = {
  get: async (url, params = {}) => {
    try {
      const response = await instance.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data = {}) => {
    try {
      const response = await instance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await instance.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await instance.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default httpService;