const { StatusCodes } = require("http-status-codes");
const { RecipeService } = require("../../services");
const { RecipeRepository } = require("../../repositories");
const NotFound = require("../../error/notFound.error");
const createResponse = require("../../utils/createResponse");

const recipeService = new RecipeService(new RecipeRepository());

const logUser = (req) => {
  console.log("User: ", req.user);
};

async function getRecipes(_, res) {
  const allRecipes = await recipeService.getRecipes();
  return res
    .status(StatusCodes.OK)
    .json(
      createResponse(true, "Recipes fetched successfully", allRecipes, null)
    );
}

async function createRecipe(req, res, next) {
  try {
    logUser(req);
    console.log("req.body", req.file);
    const newRecipe = await recipeService.createRecipe(req.body, req.file);
    return res
      .status(StatusCodes.CREATED)
      .json(
        createResponse(true, "Recipe created successfully", newRecipe, null)
      );
  } catch (error) {
    next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    logUser(req);
    const deletedRecipe = await recipeService.deleteRecipe(req.params.id);
    if (!deletedRecipe) {
      throw new NotFound("Recipe");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Recipe deleted successfully", deletedRecipe, null)
      );
  } catch (error) {
    next(error);
  }
}

async function updateRecipe(req, res, next) {
  try {
    logUser(req);
    const updatedRecipe = await recipeService.updateRecipe(
      req.params.id,
      req.body
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Recipe updated successfully", updatedRecipe, null)
      );
  } catch (error) {
    next(error);
  }
}

async function getRecipe(req, res, next) {
  try {
    logUser(req);
    const recipe = await recipeService.getRecipe(req.params.id);
    if (!recipe) {
      throw new NotFound("Recipe");
    }
    return res
      .status(StatusCodes.OK)
      .json(createResponse(true, "Recipe fetched successfully", recipe, null));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
};
