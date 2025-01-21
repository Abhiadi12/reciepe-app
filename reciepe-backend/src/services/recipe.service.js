const ResourceAlreadyExist = require("../error/resourceExist.error");
const NotFound = require("../error/notFound.error");
const BadRequest = require("../error/badRequest.error");
const cloudinary = require("../config/index").cloudinaryConfig;

/**
 * TODO:
 * clodinary upload image
 * cloudinary delete image
 * check user data
 *
 */

class RecipeService {
  constructor(recipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  async uploadImage(file) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
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

  async getRecipes() {
    try {
      const recipes = await this.recipeRepository.getRecipes();
      return recipes;
    } catch (error) {
      throw error;
    }
  }

  async createRecipe(payload, file) {
    try {
      this.checkFileExist(file);
      const cloudinaryImage = await this.uploadImage(file);
      const newRecipe = await this.recipeRepository.createRecipe({
        ...payload,
        image: {
          url: cloudinaryImage.secure_url,
          public_id: cloudinaryImage.public_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteRecipeById(id) {
    try {
      const recipe = await this.recipeRepository.deleteRecipeById(id);
      return recipe;
    } catch (error) {
      throw error;
    }
  }

  async updateRecipeById(id, payload) {
    try {
      const recipe = await this.recipeRepository.updateRecipeById(id, payload);
      return recipe;
    } catch (error) {
      throw error;
    }
  }

  async getRecipeById(id) {
    try {
      const recipe = await this.recipeRepository.getRecipeById(id);
      return recipe;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecipeService;
