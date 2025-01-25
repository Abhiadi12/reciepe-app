const { z } = require("zod");

const ratingValidationSchema = z.object({
  recipe: z
    .string()
    .nonempty("Recipe ID is required")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid Recipe ID format"),
  user: z
    .string()
    .nonempty("User ID is required")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid User ID format"),
  score: z
    .number()
    .int("Score must be an integer")
    .min(1, "Score must be at least 1")
    .max(5, "Score cannot be greater than 5"),
  feedback: z
    .string()
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),
});

module.exports = { ratingValidationSchema };
