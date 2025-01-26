const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../../services");
const { UserRepository } = require("../../repositories");
const createResponse = require("../../utils/createResponse");

const userService = new UserService(new UserRepository());

function ping(_, res) {
  return res
    .status(StatusCodes.OK)
    .json(createResponse(true, "Pong", null, null));
}

async function signup(req, res, next) {
  try {
    const user = await userService.signup(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(createResponse(true, "User created successfully", user, null));
  } catch (error) {
    console.log("log...", error);
    next(error);
  }
}

async function signin(req, res, next) {
  try {
    const user = await userService.signin(req.body);
    return res
      .status(StatusCodes.OK)
      .json(createResponse(true, "User signed in successfully", user, null));
  } catch (error) {
    next(error);
  }
}

async function getProfieInfo(req, res, next) {
  try {
    const user = await userService.getProfieInfo(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json(createResponse(true, "User profile info", user, null));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  ping,
  signup,
  signin,
  getProfieInfo,
};
