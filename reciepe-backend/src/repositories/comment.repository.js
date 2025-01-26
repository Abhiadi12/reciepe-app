const { Comment } = require("../models");

class CommentRepository {
  async createComment(payload) {
    try {
      return await Comment.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentById(id) {
    try {
      return await Comment.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllCommentsForRecipe(recipeId, entityType) {
    return await Comment.find({
      entityId: recipeId,
      entityType,
    }).populate("user", "username");
  }

  async findCommentById(id) {
    return await Comment.findById(id).populate("user", "username");
  }
}

module.exports = CommentRepository;
