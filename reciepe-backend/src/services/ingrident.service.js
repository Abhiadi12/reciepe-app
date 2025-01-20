const ResourceAlreadyExist = require("../error/resourceExist.error");

class IngridentsRepository {
  constructor(ingridentsRepository) {
    this.ingridentsRepository = ingridentsRepository;
  }

  async getIngridents() {
    try {
      const ingridents = await this.ingridentsRepository.findAllIngridents();
      return ingridents;
    } catch (error) {
      throw error;
    }
  }

  async createIngridents(payload) {
    try {
      const ingridentObject =
        await this.ingridentsRepository.findIngridentByName(payload?.name);
      if (ingridentObject) {
        throw new ResourceAlreadyExist("Ingrident");
      }

      const ingrident = await this.ingridentsRepository.createIngrident(
        payload
      );
      return ingrident;
    } catch (error) {
      throw error;
    }
  }

  async deleteIngridents(name) {
    try {
      const ingrident = await this.ingridentsRepository.deleteIngridentByName(
        name
      );
      return ingrident;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = IngridentsRepository;
