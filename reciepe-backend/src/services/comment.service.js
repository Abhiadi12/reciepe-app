const NotFound = require("../error/notFound.error");
const UnauthorizedError = require("../error/unauthorized.error");

class CommentService {
  constructor(commentRepository, recipeRepository) {
    this.commentRepository = commentRepository;
    this.recipeRepository = recipeRepository;
    this.entityType = "Recipe";
  }

  async returnSavedRecipe(recipeId) {
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

      // if recipe exist, create comment
      const comment = await this.commentRepository.createComment({
        comment,
        entityId: recipeId,
        entityType: this.entityType,
        user: userId,
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async fetchCommentsForRecipe(recipeId) {
    try {
      const comments = await this.commentRepository.findAllCommentsForRecipe(
        recipeId,
        this.entityType
      );
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentById(recipeId, commentId, userId) {
    try {
      // checkCommentExist
      const comment = this.checkCommentExist(commentId);
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
