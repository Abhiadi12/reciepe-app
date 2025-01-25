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
    if (rating?.user !== userId) {
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
      //is user the owner of the rating
      this.isOwnerOfRating(payload, userId);
      //is recipe exist
      const recipe = await this.returnSavedRecipe(payload?.recipe);
      await this.ratingRepository.createRating(payload);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async updateRating(payload, userId) {
    try {
      //is user the owner of the rating
      this.isOwnerOfRating(payload, userId);
      //is recipe exist
      await this.returnSavedRecipe(payload?.recipe);
      const updatedRating = await this.ratingRepository.updateRating(payload);
      return updatedRating;
    } catch (error) {
      throw error;
    }
  }

  async deleteRatingById(id) {
    try {
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
}

module.exports = RatingService;
