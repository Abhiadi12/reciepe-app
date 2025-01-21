const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends BaseError {
  constructor(message = "Not Allowed", details = {}) {
    super("Unauthorized", StatusCodes.UNAUTHORIZED, message, details);
  }
}

module.exports = UnauthorizedError;
