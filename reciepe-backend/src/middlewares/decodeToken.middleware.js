const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../error/unauthorized.error");
const { JWT_SECRET } = require("../config/index").serverConfig;

async function decodeToken(req, _, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      next(new UnauthorizedError("Token not found"));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid Token."));
  }
}

module.exports = decodeToken;
