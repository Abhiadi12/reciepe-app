const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const AUTH_URL = {
  LOGIN: `${baseUrl}api/v1/users/signin`,
  SIGNUP: `${baseUrl}api/v1/users/signup`,
  PROFILE: `${baseUrl}api/v1/recipes/user/:id`,
};
