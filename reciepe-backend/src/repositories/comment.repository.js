const { Comment } = require("../models");

class CommentRepository {
  async createComment(payload) {
    console.log("payload", payload);
    try {
      return await Comment.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async updateCommentById(id, comment) {
    try {
      return await Comment.findByIdAndUpdate(id, comment, {
        new: true,
      }).populate("user", "username");
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

  async findAllCommentsForRecipe(recipeId, entityType, page, limit) {
    const totalComments = await Comment.find({
      entityId: recipeId,
      entityType,
    }).countDocuments();
    const comments = await Comment.find({
      entityId: recipeId,
      entityType,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return { comments, totalComments };
  }

  async findCommentById(id) {
    return await Comment.findById(id).populate("user", "username");
  }
}

module.exports = CommentRepository;
