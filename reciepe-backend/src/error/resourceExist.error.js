const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class ResourceAlreadyExist extends BaseError {
  constructor(resourceName, details = {}) {
    super(
      "AlreadyExist",
      StatusCodes.CONFLICT,
      `${resourceName} already exist.`,
      details
    );
  }
}

module.exports = ResourceAlreadyExist;
