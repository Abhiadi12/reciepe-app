const { Recipe } = require("../models");

class RecipeRepository {
  async getRecipes() {
    return await Recipe.find()
      .populate("ingredients")
      .populate("createdBy", "username");
  }

  async createRecipe(payload) {
    try {
      return await Recipe.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async deleteRecipeById(id) {
    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      return deletedRecipe;
    } catch (error) {
      throw error;
    }
  }

  async updateRecipeById(id, payload) {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, payload, {
        new: true,
      });
      return updatedRecipe;
    } catch (error) {
      throw error;
    }
  }

  async getRecipeById(id) {
    return await Recipe.findById(id)
      .populate("ratings")
      .populate("ingredients")
      .populate("createdBy", "username");
  }

  async getRecipesByUser(userId, page, limit) {
    return await Recipe.find({ createdBy: userId })
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);
  }
}

module.exports = RecipeRepository;
