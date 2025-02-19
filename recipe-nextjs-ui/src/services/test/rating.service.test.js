import {
  fetchRatingByRecipeId,
  addRating,
  updateRating,
  getAllRatingsByRecipeId,
  deleteRating,
} from "@/services/rating.service";
import { RATING_URL } from "@/constants/ratingUrl.constant";
import { authenticatedAxios } from "@/services/api.service";

// Mock the axios instance
jest.mock("@/services/api.service", () => ({
  authenticatedAxios: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Rating Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("fetchRatingByRecipeId should call authenticatedAxios.get with correct URL", async () => {
    const mockResponse = { data: { rating: 4.5 } };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    const recipeId = "123";
    const response = await fetchRatingByRecipeId(recipeId);

    expect(authenticatedAxios.get).toHaveBeenCalledWith(
      RATING_URL.GET_RATING_BY_RECIPE_ID.replace(":recipeId", recipeId),
    );
    expect(response).toBe(mockResponse);
  });

  test("addRating should call authenticatedAxios.post with correct data", async () => {
    const mockResponse = { data: { success: true } };
    authenticatedAxios.post.mockResolvedValue(mockResponse);

    const ratingData = { recipeId: "123", rating: 5 };
    const response = await addRating(ratingData);

    expect(authenticatedAxios.post).toHaveBeenCalledWith(
      RATING_URL.ADD_RATING,
      ratingData,
    );
    expect(response).toBe(mockResponse);
  });

  test("updateRating should call authenticatedAxios.put with correct data", async () => {
    const mockResponse = { data: { success: true } };
    authenticatedAxios.put.mockResolvedValue(mockResponse);

    const ratingData = { recipeId: "123", rating: 4 };
    const response = await updateRating(ratingData);

    expect(authenticatedAxios.put).toHaveBeenCalledWith(
      RATING_URL.UPDATE_RATING,
      ratingData,
    );
    expect(response).toBe(mockResponse);
  });

  test("getAllRatingsByRecipeId should call authenticatedAxios.get with correct URL", async () => {
    const mockResponse = {
      data: [
        { id: "1", rating: 5 },
        { id: "2", rating: 4 },
      ],
    };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    const recipeId = "123";
    const response = await getAllRatingsByRecipeId(recipeId);

    expect(authenticatedAxios.get).toHaveBeenCalledWith(
      RATING_URL.GET_ALL_RATINGS_FOR_RECIPE.replace(":id", recipeId),
    );
    expect(response).toBe(mockResponse);
  });

  test("deleteRating should call authenticatedAxios.delete with correct URL", async () => {
    authenticatedAxios.delete.mockResolvedValue({ status: 204 });

    const ratingId = "r1";
    const response = await deleteRating(ratingId);

    expect(authenticatedAxios.delete).toHaveBeenCalledWith(
      RATING_URL.DELETE_RATING.replace(":id", ratingId),
    );
    expect(response.status).toBe(204);
  });
});
