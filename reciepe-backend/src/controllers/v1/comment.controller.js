const { StatusCodes } = require("http-status-codes");
const { RecipeRepository } = require("../../repositories");
const { CommentRepository } = require("../../repositories");
const { CommentService } = require("../../services");

const commentService = new CommentService(
  new CommentRepository(),
  new RecipeRepository()
);

const createResponse = require("../../utils/createResponse");

async function createComment(req, res, next) {
  try {
    const comment = await commentService.createRating(
      req.body?.comment,
      req.params?.id, // recipeId
      req.user.id
    );
    return res
      .status(StatusCodes.CREATED)
      .json(
        createResponse(true, "Comment created successfully", comment, null)
      );
  } catch (error) {
    console.log("log...", error);
    next(error);
  }
}

async function getRecipeComments(req, res, next) {
  try {
    const comments = await commentService.fetchCommentsForRecipe(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Comments fetched successfully", comments, null)
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
      req.params?.id,
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
