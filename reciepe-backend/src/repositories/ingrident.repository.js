const { Ingrident } = require("../models");

class IngridentRepository {
  async createIngrident(payload) {
    try {
      return await Ingrident.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async deleteIngridentByName(name) {
    try {
      const deletedIngredient = await Ingrident.findOneAndDelete({
        name: name.toLowerCase(),
      });
      return deletedIngredient;
    } catch (error) {
      throw error;
    }
  }

  async findAllIngridents() {
    return await Ingrident.find();
  }

  async findIngridentByName(name) {
    return await Ingrident.findOne({ name: name.toLowerCase() });
  }
}

module.exports = IngridentRepository;
