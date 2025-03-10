import axios from "axios";
import { store } from "@/store/store";
import { logout } from "@/store/authSlice";
import { message } from "@/constants/message.constant";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
  },
);

authenticatedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.data?.message === message.INVALID_TOKEN) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);
