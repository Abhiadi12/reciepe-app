const express = require("express");
const decodeToken = require("../../middlewares/decodeToken.middleware");
const validatePayload = require("../../middlewares/validatePayload.middleware");
const {
  ratingValidationSchema,
} = require("../../validations/rating.validation");
const { v1RatingController } = require("../../controllers");

const ratingRouter = express.Router();

ratingRouter.post(
  "/",
  validatePayload(ratingValidationSchema),
  decodeToken,
  v1RatingController.createRating
);
ratingRouter.put(
  "/",
  validatePayload(ratingValidationSchema),
  decodeToken,
  v1RatingController.updateRating
);
ratingRouter.delete("/:id", decodeToken, v1RatingController.deleteRating);
ratingRouter.get("/:id", decodeToken, v1RatingController.getRatingsByRecipeId);
ratingRouter.get(
  "/:recipeId/user",
  decodeToken,
  v1RatingController.getRatingByUser
);

module.exports = ratingRouter;
