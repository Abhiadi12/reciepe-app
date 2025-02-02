import { RATING_URL } from "../constants/ratingUrl.constant";
import { validQueries } from "../utils/getQueryParams";
import { authenticatedAxios } from "./api.service";

export const fetchRatingByRecipeId = async (recipeId) => {
  return authenticatedAxios.get(
    RATING_URL.GET_RATING_BY_RECIPE_ID.replace(":recipeId", recipeId)
  );
};

export const addRating = async (data) => {
  return authenticatedAxios.post(RATING_URL.ADD_RATING, data);
};

export const updateRating = async (data) => {
  return authenticatedAxios.put(RATING_URL.UPDATE_RATING, data);
};

export const getAllRatingsByRecipeId = async (recipeId) => {
  return authenticatedAxios.get(
    RATING_URL.GET_ALL_RATINGS_FOR_RECIPE.replace(":id", recipeId)
  );
};

export const deleteRating = async (id) => {
  return authenticatedAxios.delete(RATING_URL.DELETE_RATING.replace(":id", id));
};
