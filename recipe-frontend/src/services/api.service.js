import axios from "axios";
import { store } from "../store/store";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const nonAuthenticatedAxios = axios.create({
  baseURL: baseUrl,
});

export const authenticatedAxios = axios.create({
  baseURL: baseUrl,
});

authenticatedAxios.interceptors.request.use(
  (config) => {
    const { token } = store.getState()?.auth?.user || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authenticatedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log(error);
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);
