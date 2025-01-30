const UnauthorizedError = require("../error/unauthorized.error");
const NotFound = require("../error/notFound.error");
const BadRequest = require("../error/badRequest.error");
const removeFile = require("../utils/removeFile");
const checkValidId = require("../utils/checkValidId");
const cloudinary = require("../config/index").cloudinaryConfig;

class RecipeService {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async uploadImage(file, folder = "recipe") {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder,
      });
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  checkFileExist(file) {
    if (!file) {
      throw new BadRequest("file");
    }
  }

  checkRecipeExist(recipe) {
    if (!recipe) {
      throw new NotFound("Recipe");
    }
  }

  checkAuthorization(recipe, userId) {
    if (recipe.createdBy?._id?.toString() !== userId) {
      throw new Unauthorized();
    }
  }

  checkValidObjectId(id, message) {
    if (!checkValidId(id)) {
      throw new BadRequest(message);
    }
  }

  getPublicIdFromUrl(url) {
    if (!url) {
      throw new BadRequest("image url");
    }

    const splitUrl = url.split("/");
    const publicId = splitUrl[splitUrl.length - 1].split(".")[0];
    const prefix = splitUrl[splitUrl.length - 2];
    return `${prefix}/${publicId}`;
  }

  async getRecipes(page = 1, limit = 10) {
    try {
      const { recipes, totalRecipes } = await this.recipeRepository.getRecipes(
        page,
        limit
      );
      return { recipes, totalRecipes };
    } catch (error) {
      throw error;
    }
  }

  async createRecipe(payload, file, userId) {
    try {
      this.checkFileExist(file);
      const cloudinaryImage = await this.uploadImage(file);
      await this.recipeRepository.createRecipe({
        ...payload,
        image: {
          url: cloudinaryImage.secure_url,
          public_id: cloudinaryImage.public_id,
        },
        createdBy: userId,
      });
      removeFile(file.path);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async deleteRecipeById(id, userId) {
    try {
      //check if recipe exist
      const recipe = await this.recipeRepository.getRecipeById(id);
      this.checkRecipeExist(recipe);
      //check if user is the owner of the recipe
      this.checkAuthorization(recipe, userId);

      const deleteRecipe = await this.recipeRepository.deleteRecipeById(id);
      return deleteRecipe;
    } catch (error) {
      throw error;
    }
  }

  async updateRecipeById(id, payload, userId, file) {
    try {
      const recipe = await this.recipeRepository.getRecipeById(id);
      this.checkRecipeExist(recipe);
      this.checkAuthorization(recipe, userId);

      //if file is present, upload to cloudinary and update image url
      //else use existing image url
      if (file) {
        this.checkFileExist(file);
        const cloudinaryImage = await this.uploadImage(file);
        payload.image = {
          url: cloudinaryImage.secure_url,
          public_id: cloudinaryImage.public_id,
        };
        removeFile(file.path);
      } else {
        payload.image = {
          url: payload?.existingImage,
          public_id: this.getPublicIdFromUrl(payload?.existingImage),
        };
        delete payload.existingImage;
      }
      const updatedRecipe = await this.recipeRepository.updateRecipeById(
        id,
        payload
      );
      return updatedRecipe;
    } catch (error) {
      throw error;
    }
  }

  async getRecipeById(id) {
    try {
      this.checkValidObjectId(id, "Invalid Recipe Id");
      const recipe = await this.recipeRepository.getRecipeById(id);
      return recipe;
    } catch (error) {
      throw error;
    }
  }

  async getRecipesByUser(userId, page = 1, limit = 10) {
    try {
      this.checkValidObjectId(userId, "Invalid user Id");
      const { recipes, totalRecipes } =
        await this.recipeRepository.getRecipesByUser(userId, page, limit);
      return { recipes, totalRecipes };
    } catch (error) {
      throw error;
    }
  }

  async filterRecipes(page = 1, limit = 10, minPrepTime, maxPrepTime) {
    try {
      const { recipes, totalRecipes } =
        await this.recipeRepository.filterRecipes(
          page,
          limit,
          minPrepTime,
          maxPrepTime
        );
      return { recipes, totalRecipes };
    } catch (error) {
      throw error;
    }
  }

  async filterRecipesByIngredients(page = 1, limit = 10, ingredientIds) {
    try {
      const ingredientIdsArray = ingredientIds.split(",");
      const { recipes, totalRecipes } =
        await this.recipeRepository.filterRecipesByIngredients(
          page,
          limit,
          ingredientIdsArray
        );
      return { recipes, totalRecipes };
    } catch (error) {
      throw error;
    }
  }

  async filterRecipesByIngredientsAndTime(
    page = 1,
    limit = 10,
    ingredientIds,
    minPrepTime,
    maxPrepTime
  ) {
    try {
      const ingredientIdsArray = ingredientIds.split(",");
      const { recipes, totalRecipes } =
        await this.recipeRepository.filterRecipesByIngredientsAndTime(
          page,
          limit,
          ingredientIdsArray,
          minPrepTime,
          maxPrepTime
        );
      return { recipes, totalRecipes };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecipeService;
