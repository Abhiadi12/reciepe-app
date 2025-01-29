import { RECIPE_URL } from "../constants/recipeUrl.constant";
import { validQueries } from "../utils/getQueryParams";
import { nonAuthenticatedAxios, authenticatedAxios } from "./api.service";

export const fetchFilteredRecipes = async (
  page,
  limit,
  minPrepTime,
  maxPrepTime,
  ingredientIds
) => {
  const getparams = validQueries({
    page,
    limit,
    minPrepTime,
    maxPrepTime,
    ingredientIds,
  });
  if (ingredientIds.length === 0) {
    delete getparams.ingredientIds;
  }
  return authenticatedAxios.get(RECIPE_URL.FILTER, {
    params: getparams,
  });
};

export const fetchAllRecipes = async (queries) => {
  const getparams = validQueries(queries);
  return nonAuthenticatedAxios.get(RECIPE_URL.GET_ALL_RECIPES, {
    params: getparams,
  });
};

export const fetchAllIngredients = async () => {
  return nonAuthenticatedAxios.get(RECIPE_URL.GET_RECIPE_INGREDIENTS);
};

export const fetchRecipeById = async (id) => {
  return authenticatedAxios.get(RECIPE_URL.GET_RECIPE_BY_ID.replace(":id", id));
};
