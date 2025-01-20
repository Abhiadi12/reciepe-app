const express = require("express");
const { v1UserController } = require("../../controllers");
const validatePayload = require("../../middlewares/validatePayload.middleware");
const {
  userRegistrationSchema,
  userLoginSchema,
} = require("../../validations/user.validation");

const userRouter = express.Router();

userRouter.get("/ping", v1UserController.ping);
userRouter.post(
  "/signup",
  validatePayload(userRegistrationSchema),
  v1UserController.signup
);
userRouter.post(
  "/signin",
  validatePayload(userLoginSchema),
  v1UserController.signin
);
userRouter.get("/:id", v1UserController.getProfieInfo);

module.exports = userRouter;
