const baseUrl = import.meta.env.VITE_BASE_URL;

export const RECIPE_URL = {
  FILTER: `${baseUrl}api/v1/recipes/filter`,
  GET_ALL_RECIPES: `${baseUrl}api/v1/recipes`,
  GET_RECIPE_BY_ID: `${baseUrl}api/v1/recipes/:id`,
  ADD_RECIPE: `${baseUrl}api/v1/recipes`,
  UPDATE_RECIPE: `${baseUrl}api/v1/recipes/:id`,
  DELETE_RECIPE: `${baseUrl}api/v1/recipes/:id`,
  GET_USER_RECIPES: `${baseUrl}api/v1/recipes/user/:id`,
  GET_RECIPE_INGREDIENTS: `${baseUrl}api/v1/ingridents`,
};
