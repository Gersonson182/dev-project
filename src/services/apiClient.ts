// src/services/apiClient.ts
import axios from 'axios';

const token = import.meta.env.VITE_API_TOKEN;
const url = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
