const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");
class NotFound extends BaseError {
  constructor(resourceName, message = "") {
    if (message === "") {
      message = `The represented resource: ${resourceName} not found`;
    }
    super("NotFound", StatusCodes.NOT_FOUND, message, {
      resourceName,
    });
  }
}

module.exports = NotFound;
