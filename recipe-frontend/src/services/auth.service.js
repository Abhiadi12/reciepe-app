import { AUTH_URL } from "../constants/authUrl.constant";
import { nonAuthenticatedAxios } from "./api.service";

export const login = async (email, password) => {
  return nonAuthenticatedAxios.post(AUTH_URL.LOGIN, {
    email,
    password,
  });
};

export const signup = async (username, email, password) => {
  return nonAuthenticatedAxios.post(AUTH_URL.SIGNUP, {
    username,
    email,
    password,
  });
};

export const getProfile = async (id) => {
  return nonAuthenticatedAxios.get(AUTH_URL.PROFILE.replace(":id", id));
};
