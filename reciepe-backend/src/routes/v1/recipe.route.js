const express = require("express");
const recipeRouter = express.Router();
const { v1RecipeController } = require("../../controllers");
const {
  addRecipePaylodSchema,
} = require("../../validations/recipe.validation");
const validatePayload = require("../../middlewares/validatePayload.middleware");
const decodeToken = require("../../middlewares/decodeToken.middleware");
const upload = require("../../utils/fileUpload");

const convertPreparationTimeAsNumber = (req, res, next) => {
  try {
    let { prepTime } = req.body;
    if (prepTime) {
      req.body.prepTime = parseInt(prepTime);
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid form-data payload" });
  }
};

recipeRouter.get("/", v1RecipeController.getRecipes);
recipeRouter.post(
  "/",
  upload.single("file"),
  convertPreparationTimeAsNumber,
  validatePayload(addRecipePaylodSchema),
  decodeToken,
  v1RecipeController.createRecipe
);
recipeRouter.get("/:id", decodeToken, v1RecipeController.getRecipe);
recipeRouter.put(
  "/:id",
  upload.single("file"),
  convertPreparationTimeAsNumber,
  validatePayload(addRecipePaylodSchema),
  decodeToken,
  v1RecipeController.updateRecipe
);
recipeRouter.delete("/:id", decodeToken, v1RecipeController.deleteRecipe);
recipeRouter.get("/user/:id", decodeToken, v1RecipeController.getRecipesByUser);

module.exports = recipeRouter;
