const { Rating } = require("../models");
class RatingRepository {
  async createRating(payload) {
    try {
      return await Rating.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async deleteRatingById(id) {
    try {
      const deletedRating = await Rating.findOneAndDelete({ _id: id });
      return deletedRating;
    } catch (error) {
      throw error;
    }
  }

  async updateRating(payload) {
    try {
      const { user, recipe, score, feedback } = payload;
      if (!feedback) {
        delete payload.feedback;
      }
      const updatedRating = await Rating.findOneAndUpdate(
        { recipe, user },
        { score, feedback },
        {
          new: true,
        }
      );
      return updatedRating;
    } catch (error) {
      throw error;
    }
  }

  async deleteRatingById(id) {
    try {
      const deletedRating = await Rating.findByIdAndDelete(id);
      return deletedRating;
    } catch (error) {
      throw error;
    }
  }

  async getRatingById(id) {
    return await Rating.findById(id);
  }

  async getRatingByRecipeAndUser(recipeId, userId) {
    return await Rating.findOne({ recipe: recipeId, user: userId });
  }

  async getRatingsByRecipeId(recipeId) {
    return await Rating.find({ recipe: recipeId }).populate("user", "username");
  }
}

module.exports = RatingRepository;
