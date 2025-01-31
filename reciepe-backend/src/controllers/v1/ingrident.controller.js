const { StatusCodes } = require("http-status-codes");
const { IngridentService } = require("../../services");
const { IngridentRepository } = require("../../repositories");
const NotFound = require("../../error/notFound.error");
const createResponse = require("../../utils/createResponse");
const ingridentService = new IngridentService(new IngridentRepository());

async function getIngridents(_, res) {
  const allIngridents = await ingridentService.getIngridents();
  return res
    .status(StatusCodes.OK)
    .json(
      createResponse(
        true,
        "Ingridents fetched successfully",
        allIngridents,
        null
      )
    );
}

async function createIngridents(req, res, next) {
  try {
    const newIngrident = await ingridentService.createIngridents(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(
        createResponse(
          true,
          "Ingrident created successfully",
          newIngrident,
          null
        )
      );
  } catch (error) {
    next(error);
  }
}

async function deleteIngridents(req, res, next) {
  try {
    const deletedIngrident = await ingridentService.deleteIngridents(
      req.params.name
    );
    if (!deletedIngrident) {
      throw new NotFound("Ingrident");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        createResponse(
          true,
          "Ingrident deleted successfully",
          deletedIngrident,
          null
        )
      );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getIngridents,
  createIngridents,
  deleteIngridents,
};
