import axios from "axios";
import { AUTH_URL } from "../constants/authUrl.constant";

export const login = async (email, password) => {
  return axios.post(AUTH_URL.LOGIN, {
    email,
    password,
  });
};

export const signup = async (username, email, password) => {
  return axios.post(AUTH_URL.SIGNUP, {
    username,
    email,
    password,
  });
};

export const getProfile = async (id) => {
  return axios.get(AUTH_URL.PROFILE.replace(":id", id));
};
