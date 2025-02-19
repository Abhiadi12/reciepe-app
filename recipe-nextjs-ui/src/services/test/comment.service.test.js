import {
  fetchRecipeComments,
  createComment,
  deleteComment,
  updateCommentById,
} from "@/services/comment.service";
import { COMMENT_URL } from "@/constants/commentUrl.constant";
import { validQueries } from "@/utils/getQueryParams";
import { authenticatedAxios } from "@/services/api.service";

// Mock the axios instance
jest.mock("@/services/api.service", () => ({
  authenticatedAxios: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock("@/utils/getQueryParams", () => ({
  validQueries: jest.fn((q) => q),
}));

describe("Comment Service", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test("fetchRecipeComments should call authenticatedAxios.get with correct URL and params", async () => {
    const mockResponse = { data: [{ id: "c1", text: "Nice recipe!" }] };
    authenticatedAxios.get.mockResolvedValue(mockResponse);

    const recipeId = "123";
    const queries = { sort: "desc" };

    const response = await fetchRecipeComments(recipeId, queries);

    expect(authenticatedAxios.get).toHaveBeenCalledWith(
      COMMENT_URL.FETCH_RECIPE_COMMENTS.replace(":id", recipeId),
      { params: queries },
    );
    expect(response).toBe(mockResponse);
  });

  test("createComment should call authenticatedAxios.post with correct URL and data", async () => {
    const mockResponse = { data: { id: "c1", text: "Great dish!" } };
    authenticatedAxios.post.mockResolvedValue(mockResponse);

    const recipeId = "123";
    const commentData = { text: "Great dish!" };

    const response = await createComment(recipeId, commentData);

    expect(authenticatedAxios.post).toHaveBeenCalledWith(
      COMMENT_URL.CREATE_COMMENT.replace(":id", recipeId),
      commentData,
    );
    expect(response).toBe(mockResponse);
  });

  test("deleteComment should call authenticatedAxios.delete with correct URL", async () => {
    authenticatedAxios.delete.mockResolvedValue({ status: 204 });

    const recipeId = "123";
    const commentId = "c1";

    const response = await deleteComment(recipeId, commentId);

    expect(authenticatedAxios.delete).toHaveBeenCalledWith(
      COMMENT_URL.DELETE_COMMENT.replace(":id", recipeId).replace(
        ":commentId",
        commentId,
      ),
    );
    expect(response.status).toBe(204);
  });

  test("updateCommentById should call authenticatedAxios.put with correct URL and data", async () => {
    const mockResponse = { data: { id: "c1", text: "Updated comment!" } };
    authenticatedAxios.put.mockResolvedValue(mockResponse);

    const recipeId = "123";
    const commentId = "c1";
    const updateData = { text: "Updated comment!" };

    const response = await updateCommentById(recipeId, commentId, updateData);

    expect(authenticatedAxios.put).toHaveBeenCalledWith(
      COMMENT_URL.UPDATE_COMMENT.replace(":id", recipeId).replace(
        ":commentId",
        commentId,
      ),
      updateData,
    );
    expect(response).toBe(mockResponse);
  });
});
