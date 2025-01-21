const { StatusCodes } = require("http-status-codes");
const { ZodError } = require("zod");
const BaseError = require("../error/base.error");
const createResponse = require("../utils/createResponse");

function errorHandler(error, req, res, next) {
  console.error(error);
  if (error instanceof BaseError) {
    return res
      .status(error.statusCode)
      .json(createResponse(false, error.message, null, error.details));
  }

  if (error instanceof ZodError) {
    const errorMessages = error?.errors?.map((issue) => ({
      message: `${issue?.path?.join(".")} is ${issue?.message}`,
    }));
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(createResponse(false, "Validation error.", null, errorMessages));
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(createResponse(false, "Something went wrong.", null, error));
}

module.exports = errorHandler;
