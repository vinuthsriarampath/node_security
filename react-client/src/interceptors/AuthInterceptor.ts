import axios from 'axios';
import { refreshToken } from '../services/AuthService';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // We'll update to use context later
    if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register') && !config.url?.includes('/auth/refresh')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 429) {
      const rateLimitMsg = error.response.data?.message || 'Too many requests - please wait and try again.';
      console.warn('Rate limited:', rateLimitMsg);
      return Promise.reject(new Error(rateLimitMsg));
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { accessToken: newToken } = await refreshToken();
        localStorage.setItem('accessToken', newToken); // Temp; update to context
        axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null);
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Logout logic here if needed
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);