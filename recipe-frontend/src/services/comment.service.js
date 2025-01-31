import { COMMENT_URL } from "../constants/commentUrl.constant";
import { validQueries } from "../utils/getQueryParams";
import { authenticatedAxios } from "./api.service";

export const fetchRecipeComments = async (id, queries = {}) => {
  const getparams = validQueries(queries);

  return authenticatedAxios.get(
    COMMENT_URL.FETCH_RECIPE_COMMENTS.replace(":id", id),
    {
      params: getparams,
    }
  );
};

export const createComment = async (id, data) => {
  return authenticatedAxios.post(
    COMMENT_URL.CREATE_COMMENT.replace(":id", id),
    data
  );
};

export const deleteComment = async (id, commentId) => {
  return authenticatedAxios.delete(
    COMMENT_URL.DELETE_COMMENT.replace(":id", id).replace(
      ":commentId",
      commentId
    )
  );
};

export const updateCommentById = async (id, commentId, data) => {
  return authenticatedAxios.put(
    COMMENT_URL.UPDATE_COMMENT.replace(":id", id).replace(
      ":commentId",
      commentId
    ),
    data
  );
};
