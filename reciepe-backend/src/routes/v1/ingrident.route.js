const express = require("express");
const { v1IngridentController } = require("../../controllers");
const validatePayload = require("../../middlewares/validatePayload.middleware");
const {
  addIngridentSchema,
} = require("../../validations/ingrident.validation");

const ingridentRouter = express.Router();

ingridentRouter.get("/", v1IngridentController.getIngridents);
ingridentRouter.post(
  "/",
  validatePayload(addIngridentSchema),
  v1IngridentController.createIngridents
);
ingridentRouter.delete("/:name", v1IngridentController.deleteIngridents);

module.exports = ingridentRouter;
