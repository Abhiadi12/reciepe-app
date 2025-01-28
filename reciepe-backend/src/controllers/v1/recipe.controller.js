const { StatusCodes } = require("http-status-codes");
const { RecipeService } = require("../../services");
const { RecipeRepository } = require("../../repositories");
const NotFound = require("../../error/notFound.error");
const createResponse = require("../../utils/createResponse");

const recipeService = new RecipeService(new RecipeRepository());

const logUser = (req) => {
  console.log("User: ", req.user);
};

async function getRecipes(req, res) {
  const { page, limit } = req.query;
  const allRecipes = await recipeService.getRecipes(page, limit);
  return res
    .status(StatusCodes.OK)
    .json(
      createResponse(true, "Recipes fetched successfully", allRecipes, null)
    );
}

async function createRecipe(req, res, next) {
  try {
    logUser(req);
    await recipeService.createRecipe(req.body, req.file, req.user.id);
    return res
      .status(StatusCodes.CREATED)
      .json(createResponse(true, "Recipe created successfully", null, null));
  } catch (error) {
    next(error);
  }
}

async function deleteRecipe(req, res, next) {
  try {
    logUser(req);
    const deletedRecipe = await recipeService.deleteRecipeById(
      req.params.id,
      req.user.id
    );
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
    const updatedRecipe = await recipeService.updateRecipeById(
      req.params.id,
      req.body,
      req.user.id
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
    const recipe = await recipeService.getRecipeById(req.params.id);
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

async function getRecipesByUser(req, res, next) {
  try {
    const { page, limit } = req.query;
    const recipes = await recipeService.getRecipesByUser(
      req.params?.id,
      page,
      limit
    );
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Recipes fetched successfully", recipes, null)
      );
  } catch (error) {
    next(error);
  }
}

async function filterRecipes(req, res, next) {
  try {
    const { page, limit, minPrepTime, maxPrepTime, ingredientIds } = req.query;
    if (minPrepTime && maxPrepTime && ingredientIds) {
      const recipes = await recipeService.filterRecipesByIngredientsAndTime(
        page,
        limit,
        ingredientIds
      );
      return res
        .status(StatusCodes.OK)
        .json(
          createResponse(true, "Recipes fetched successfully", recipes, null)
        );
    }
    if (ingredientIds) {
      const recipes = await recipeService.filterRecipesByIngredients(
        page,
        limit,
        ingredientIds
      );
      return res
        .status(StatusCodes.OK)
        .json(
          createResponse(true, "Recipes fetched successfully", recipes, null)
        );
    }

    const recipes = await recipeService.filterRecipes(
      page,
      limit,
      minPrepTime,
      maxPrepTime
    );

    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(true, "Recipes fetched successfully", recipes, null)
      );
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
  getRecipesByUser,
  filterRecipes,
};
