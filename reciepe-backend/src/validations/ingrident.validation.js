const { z } = require("zod");

const addIngridentSchema = z.object({
  name: z.string().min(3, "Ingrident name must be at least 3 characters long"),
});

module.exports = {
  addIngridentSchema,
};
