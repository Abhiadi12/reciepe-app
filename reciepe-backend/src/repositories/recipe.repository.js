const { Recipe } = require("../models");

class RecipeRepository {
  async getRecipes(page, limit) {
    const totalRecipes = await Recipe.find().countDocuments();
    const recipes = await Recipe.find()
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    return { recipes, totalRecipes };
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
    const totalRecipes = await Recipe.countDocuments({ createdBy: userId });
    const recipes = await Recipe.find({ createdBy: userId })
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    return { recipes, totalRecipes };
  }

  async filterRecipes(page, limit, minPrepTime, maxPrepTime) {
    const totalRecipes = await Recipe.countDocuments({
      prepTime: { $gte: minPrepTime, $lte: maxPrepTime },
    });

    const recipes = await Recipe.find({
      prepTime: { $gte: minPrepTime, $lte: maxPrepTime },
    })
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    return { recipes, totalRecipes };
  }

  async filterRecipesByIngredients(page, limit, ingredientIds) {
    console.log("ingredientIds::", ingredientIds);
    const totalRecipes = await Recipe.countDocuments({
      ingredients: { $in: ingredientIds },
    });

    const recipes = await Recipe.find({
      ingredients: { $in: ingredientIds },
    })
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    return { recipes, totalRecipes };
  }

  async filterRecipesByIngredientsAndTime(
    page,
    limit,
    ingredientIds,
    minPrepTime,
    maxPrepTime
  ) {
    console.log("ingredientIds::", ingredientIds);
    const totalRecipes = await Recipe.countDocuments({
      ingredients: { $in: ingredientIds },
      prepTime: { $gte: minPrepTime, $lte: maxPrepTime },
    });

    const recipes = await Recipe.find({
      ingredients: { $in: ingredientIds },
      prepTime: { $gte: minPrepTime, $lte: maxPrepTime },
    })
      .populate("ingredients")
      .populate("createdBy", "username")
      .skip((page - 1) * limit)
      .limit(limit);

    return { recipes, totalRecipes };
  }
}

module.exports = RecipeRepository;
