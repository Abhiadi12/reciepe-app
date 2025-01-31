const NotFound = require("../error/notFound.error");
const UnauthorizedError = require("../error/unauthorized.error");

class CommentService {
  constructor(commentRepository, recipeRepository) {
    this.commentRepository = commentRepository;
    this.recipeRepository = recipeRepository;
    this.entityType = "Recipe";
  }

  async returnSavedRecipe(recipeId) {
    console.log("recipeId", recipeId);
    const recipe = await this.recipeRepository.getRecipeById(recipeId);
    if (!recipe) {
      throw new NotFound("Recipe");
    }
    return recipe;
  }

  async checkCommentExist(commentId) {
    const comment = await this.commentRepository.findCommentById(commentId);
    if (!comment) {
      throw new NotFound("Comment");
    }
    return comment;
  }

  async checkAuthorization(comment, userId) {
    if (comment.user?._id?.toString() !== userId) {
      throw new UnauthorizedError();
    }
  }

  async createComment(comment, recipeId, userId) {
    try {
      await this.returnSavedRecipe(recipeId);

      const newComment = await this.commentRepository.createComment({
        comment,
        entityId: recipeId,
        entityType: this.entityType,
        user: userId,
      });

      return newComment;
    } catch (error) {
      throw error;
    }
  }

  async fetchCommentsForRecipe(recipeId, page = 1, limit = 10) {
    try {
      const { comments, totalComments } =
        await this.commentRepository.findAllCommentsForRecipe(
          recipeId,
          this.entityType,
          page,
          limit
        );
      return { comments, totalComments };
    } catch (error) {
      throw error;
    }
  }

  async updateCommentById(comment, commentId, userId) {
    try {
      // checkCommentExist
      const comment = await this.checkCommentExist(commentId);
      // checkAuthorization
      this.checkAuthorization(comment, userId);
      const updatedComment = await this.commentRepository.updateCommentById(
        commentId,
        comment
      );
      return updatedComment;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentById(recipeId, commentId, userId) {
    try {
      // checkCommentExist
      const comment = await this.checkCommentExist(commentId);
      // checkAuthorization
      this.checkAuthorization(comment, userId);
      await this.commentRepository.deleteCommentById(commentId);
      return comment;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CommentService;
