const UnauthorizedError = require("../error/unauthorized.error");
const NotFound = require("../error/notFound.error");
const checkValidId = require("../utils/checkValidId");
const BadRequest = require("../error/badRequest.error");

class RatingService {
  constructor(ratingRepository, recipeRepository) {
    this.ratingRepository = ratingRepository;
    this.recipeRepository = recipeRepository;
  }

  isOwnerOfRating(rating, userId) {
    if (rating?.user?.toString() !== userId) {
      throw new UnauthorizedError();
    }
  }

  checkRatingExist(rating) {
    if (!rating) {
      throw new NotFound("Rating");
    }
  }

  async returnSavedRecipe(recipeId) {
    const recipe = await this.recipeRepository.getRecipeById(recipeId);
    if (!recipe) {
      throw new NotFound("Recipe");
    }
    return recipe;
  }

  async createRating(payload, userId) {
    try {
      //is recipe exist
      const recipe = await this.returnSavedRecipe(payload?.recipe);
      // not allow if recipe user id is the same as the rating user id
      if (recipe.createdBy?._id?.toString() === userId) {
        throw new UnauthorizedError("You can't rate your own recipe");
      }
      const rating = await this.ratingRepository.createRating(payload);

      // Use the DAO to update the recipe by pushing the new rating ID
      await this.recipeRepository.updateRecipeById(payload?.recipe, {
        $push: { ratings: rating._id },
      });
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async updateRating(payload, userId) {
    try {
      const rating = await this.ratingRepository.getRatingByRecipeAndUser(
        payload?.recipe,
        userId
      );
      this.checkRatingExist(rating);
      this.isOwnerOfRating(rating, userId);
      const updatedRating = await this.ratingRepository.updateRating(payload);
      return updatedRating;
    } catch (error) {
      throw error;
    }
  }

  async deleteRatingById(id, userId) {
    try {
      const isvalid = checkValidId(id);
      if (!isvalid) {
        throw new BadRequest("Invalid Rating Id");
      }
      const rating = await this.ratingRepository.getRatingById(id);
      this.checkRatingExist(rating);
      this.isOwnerOfRating(rating, userId);

      const deletedRating = await this.ratingRepository.deleteRatingById(id);
      return deletedRating;
    } catch (error) {
      throw error;
    }
  }

  async getRatingById(id) {
    try {
      const isvalid = checkValidId(id);
      if (!isvalid) {
        throw new BadRequest("Invalid Rating Id");
      }
      const rating = await this.ratingRepository.getRatingById(id);
      this.checkRatingExist(rating);
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async getRatingByUser(recipeId, userId) {
    try {
      const isvalid = checkValidId(recipeId);
      if (!isvalid) {
        throw new BadRequest("Invalid Recipe Id");
      }
      const rating = await this.ratingRepository.getRatingByRecipeAndUser(
        recipeId,
        userId
      );
      this.checkRatingExist(rating);
      return rating;
    } catch (error) {
      throw error;
    }
  }

  async getRatingsByRecipeId(recipeId) {
    try {
      const isvalid = checkValidId(recipeId);
      if (!isvalid) {
        throw new BadRequest("Invalid Recipe Id");
      }
      const ratings = await this.ratingRepository.getRatingsByRecipeId(
        recipeId
      );
      return ratings;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RatingService;
