const { z } = require("zod");

const commentPayloadSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});

module.exports = {
  commentPayloadSchema,
};
