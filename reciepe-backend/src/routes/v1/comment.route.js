const express = require("express");
const commentRouter = express.Router();
const decodeToken = require("../../middlewares/decodeToken.middleware");
const validatePayload = require("../../middlewares/validatePayload.middleware");
const { v1CommentController } = require("../../controllers");
const {
  commentPayloadSchema,
} = require("../../validations/comment.validation");

commentRouter.get("/", decodeToken, v1CommentController.getRecipeComments);
commentRouter.post(
  "/",
  validatePayload(commentPayloadSchema),
  decodeToken,
  v1CommentController.createComment
);
commentRouter.put(
  "/:commentId",
  validatePayload(commentPayloadSchema),
  decodeToken,
  v1CommentController.updateComment
);
commentRouter.delete(
  "/:commentId",
  decodeToken,
  v1CommentController.deleteComment
);

module.exports = commentRouter;
