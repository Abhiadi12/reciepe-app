import {
  fetchFilteredRecipes,
  fetchAllRecipes,
  fetchAllIngredients,
  fetchRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "@/services/recipe.service";
import { RECIPE_URL } from "@/constants/recipeUrl.constant";
import {
  authenticatedAxios,
  nonAuthenticatedAxios,
} from "@/services/api.service";
import { validQueries } from "@/utils/getQueryParams";

// Mock axios instances
jest.mock("@/services/api.service", () => ({
  authenticatedAxios: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  nonAuthenticatedAxios: {
    get: jest.fn(),
  },
}));

jest.mock("@/utils/getQueryParams", () => ({
  validQueries: jest.fn(),
}));

describe("Recipe Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("fetchFilteredRecipes should call authenticatedAxios.get with correct params", async () => {
    const mockResponse = { data: { recipes: [] } };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    validQueries.mockReturnValue({
      page: 1,
      limit: 10,
      minPrepTime: 5,
      maxPrepTime: 30,
      ingredientIds: ["1", "2"],
    });

    const response = await fetchFilteredRecipes(1, 10, 5, 30, ["1", "2"]);

    expect(validQueries).toHaveBeenCalledWith({
      page: 1,
      limit: 10,
      minPrepTime: 5,
      maxPrepTime: 30,
      ingredientIds: ["1", "2"],
    });

    expect(authenticatedAxios.get).toHaveBeenCalledWith(RECIPE_URL.FILTER, {
      params: {
        page: 1,
        limit: 10,
        minPrepTime: 5,
        maxPrepTime: 30,
        ingredientIds: ["1", "2"],
      },
    });

    expect(response).toBe(mockResponse);
  });

  test("fetchAllRecipes should call nonAuthenticatedAxios.get with correct params", async () => {
    const mockResponse = { data: [{ id: "123", name: "Recipe" }] };
    nonAuthenticatedAxios.get.mockResolvedValue(mockResponse);

    validQueries.mockReturnValue({ category: "vegan" });

    const response = await fetchAllRecipes({ category: "vegan" });

    expect(validQueries).toHaveBeenCalledWith({ category: "vegan" });

    expect(nonAuthenticatedAxios.get).toHaveBeenCalledWith(
      RECIPE_URL.GET_ALL_RECIPES,
      { params: { category: "vegan" } },
    );

    expect(response).toBe(mockResponse);
  });

  test("fetchAllIngredients should call nonAuthenticatedAxios.get", async () => {
    const mockResponse = { data: [{ id: "1", name: "Tomato" }] };
    nonAuthenticatedAxios.get.mockResolvedValue(mockResponse);

    const response = await fetchAllIngredients();

    expect(nonAuthenticatedAxios.get).toHaveBeenCalledWith(
      RECIPE_URL.GET_RECIPE_INGREDIENTS,
    );

    expect(response).toBe(mockResponse);
  });

  test("fetchRecipeById should call authenticatedAxios.get with correct URL", async () => {
    const mockResponse = { data: { id: "123", name: "Recipe" } };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    const response = await fetchRecipeById("123");

    expect(authenticatedAxios.get).toHaveBeenCalledWith(
      RECIPE_URL.GET_RECIPE_BY_ID.replace(":id", "123"),
    );

    expect(response).toBe(mockResponse);
  });

  test("addRecipe should call authenticatedAxios.post with correct data", async () => {
    const mockResponse = { data: { success: true } };
    authenticatedAxios.post.mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append("name", "New Recipe");

    const response = await addRecipe(formData);

    expect(authenticatedAxios.post).toHaveBeenCalledWith(
      RECIPE_URL.ADD_RECIPE,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    expect(response).toBe(mockResponse);
  });

  test("updateRecipe should call authenticatedAxios.put with correct data", async () => {
    const mockResponse = { data: { success: true } };
    authenticatedAxios.put.mockResolvedValue(mockResponse);

    const formData = new FormData();
    formData.append("name", "Updated Recipe");

    const response = await updateRecipe("123", formData);

    expect(authenticatedAxios.put).toHaveBeenCalledWith(
      RECIPE_URL.UPDATE_RECIPE.replace(":id", "123"),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    expect(response).toBe(mockResponse);
  });

  test("deleteRecipe should call authenticatedAxios.delete with correct URL", async () => {
    authenticatedAxios.delete.mockResolvedValue({ status: 204 });

    const response = await deleteRecipe("123");

    expect(authenticatedAxios.delete).toHaveBeenCalledWith(
      RECIPE_URL.DELETE_RECIPE.replace(":id", "123"),
    );

    expect(response.status).toBe(204);
  });
});
