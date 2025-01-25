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

  async getRecipes() {
    try {
      const recipes = await this.recipeRepository.getRecipes();
      return recipes;
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

  async updateRecipeById(id, payload, userId) {
    try {
      const recipe = await this.recipeRepository.getRecipeById(id);
      this.checkRecipeExist(recipe);
      this.checkAuthorization(recipe, userId);
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
      const isvalid = checkValidId(id);
      if (!isvalid) {
        throw new BadRequest("Invalid Recipe Id");
      }
      const recipe = await this.recipeRepository.getRecipeById(id);
      return recipe;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecipeService;
