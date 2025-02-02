const { StatusCodes } = require("http-status-codes");
const { RatingService } = require("../../services");
const { RatingRepository } = require("../../repositories");
const { RecipeRepository } = require("../../repositories");

const createResponse = require("../../utils/createResponse");

const ratingService = new RatingService(
  new RatingRepository(),
  new RecipeRepository()
);

async function createRating(req, res, next) {
  try {
    const rating = await ratingService.createRating(req.body, req.user.id);
    return res
      .status(StatusCodes.CREATED)
      .json(createResponse(true, "Rating created successfully", rating, null));
  } catch (error) {
    console.log("log...", error);
    next(error);
  }
}

async function updateRating(req, res, next) {
  try {
    const updatedRating = await ratingService.updateRating(
      req.body,
      req.user.id
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Rating updated successfully", updatedRating, null)
      );
  } catch (error) {
    console.log("log...", error);
    next(error);
  }
}

async function deleteRating(req, res, next) {
  try {
    const deletedRating = await ratingService.deleteRatingById(
      req.params.id,
      req.user.id
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Rating deleted successfully", deletedRating, null)
      );
  } catch (error) {
    console.log("log...", error);
    next(error);
  }
}

async function getRatingsByRecipeId(req, res, next) {
  try {
    const rating = await ratingService.getRatingsByRecipeId(req.params.id);

    return res
      .status(StatusCodes.OK)
      .json(createResponse(true, "Rating fetched successfully", rating, null));
  } catch (error) {
    next(error);
  }
}

async function getRatingByUser(req, res, next) {
  try {
    const { recipeId } = req.params;
    const rating = await ratingService.getRatingByUser(recipeId, req.user.id);
    return res
      .status(StatusCodes.OK)
      .json(createResponse(true, "Rating fetched successfully", rating, null));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createRating,
  updateRating,
  deleteRating,
  getRatingsByRecipeId,
  getRatingByUser,
};
