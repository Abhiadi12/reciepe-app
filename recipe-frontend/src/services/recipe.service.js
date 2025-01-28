import { RECIPE_URL } from "../constants/recipeUrl.constant";
import { nonAuthenticatedAxios, authenticatedAxios } from "./api.service";

export const fetchFilteredRecipes = async (
  page,
  limit,
  minTime,
  maxTime,
  ingridentsIds
) => {
  console.log(
    "fetchFilteredRecipes",
    page,
    limit,
    minTime,
    maxTime,
    ingridentsIds
  );
  return authenticatedAxios.get(RECIPE_URL.FILTER, {});
};

export const fetchAllRecipes = async () => {
  return nonAuthenticatedAxios.get(RECIPE_URL.GET_ALL_RECIPES);
}

export const fetchAllIngredients = async () => {
  return nonAuthenticatedAxios.get(RECIPE_URL.GET_RECIPE_INGREDIENTS);
}

