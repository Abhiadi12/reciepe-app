const { StatusCodes } = require("http-status-codes");
const { RecipeRepository } = require("../../repositories");
const { CommentRepository } = require("../../repositories");
const { CommentService } = require("../../services");
const createResponse = require("../../utils/createResponse");

const commentService = new CommentService(
  new CommentRepository(),
  new RecipeRepository()
);

async function createComment(req, res, next) {
  try {
    const comment = await commentService.createComment(
      req.body?.comment,
      req.recipeId, // recipeId
      req.user.id
    );
    return res
      .status(StatusCodes.CREATED)
      .json(
        createResponse(true, "Comment created successfully", comment, null)
      );
  } catch (error) {
    next(error);
  }
}

async function getRecipeComments(req, res, next) {
  try {
    const { page, limit } = req.query;
    const { comments, totalComments } =
      await commentService.fetchCommentsForRecipe(req.recipeId, page, limit);
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(
          true,
          "Comments fetched successfully",
          { comments, totalComments },
          null
        )
      );
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const updatedComment = await commentService.updateCommentById(
      req.body?.comment, // content
      req.params?.commentId,
      req.user.id
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(
          true,
          "Comment updated successfully",
          updatedComment,
          null
        )
      );
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const deletedComment = await commentService.deleteCommentById(
      req.recipeId,
      req.params?.commentId,
      req.user.id
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(
          true,
          "Comment deleted successfully",
          deletedComment,
          null
        )
      );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createComment,
  getRecipeComments,
  deleteComment,
  updateComment,
};
