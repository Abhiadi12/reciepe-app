const { z } = require("zod");

const addRecipePaylodSchema = z.object({
  title: z.string().min(3, "Recipe title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Recipe description must be at least 3 characters long"),
  ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")),
  steps: z
    .array(z.string().min(1, "Step cannot be empty")) // Ensure steps are strings and non-empty
    .min(1, "At least one step is required"), // Require at least one preparation step
  prepTime: z
    .number()
    .int()
    .min(1, "Preparation time must be at least 1 minute"),
});

module.exports = {
  addRecipePaylodSchema,
};
