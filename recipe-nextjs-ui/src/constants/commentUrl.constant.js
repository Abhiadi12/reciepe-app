const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const COMMENT_URL = {
  FETCH_RECIPE_COMMENTS: `${baseUrl}api/v1/recipes/:id/comments`,
  CREATE_COMMENT: `${baseUrl}api/v1/recipes/:id/comments`,
  DELETE_COMMENT: `${baseUrl}api/v1/recipes/:id/comments/:commentId`,
  UPDATE_COMMENT: `${baseUrl}api/v1/recipes/:id/comments/:commentId`,
};
