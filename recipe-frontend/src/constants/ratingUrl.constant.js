const baseUrl = import.meta.env.VITE_BASE_URL;

export const RATING_URL = {
  GET_RATING_BY_RECIPE_ID: `${baseUrl}api/v1/ratings/:recipeId/user`,
  ADD_RATING: `${baseUrl}api/v1/ratings`,
  UPDATE_RATING: `${baseUrl}api/v1/ratings`,
  DELETE_RATING: `${baseUrl}api/v1/ratings/:id`,
  GET_ALL_RATINGS_FOR_RECIPE: `${baseUrl}api/v1/ratings/:id`,
};
