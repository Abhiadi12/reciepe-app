const mongoose = require("mongoose");
const cloudinary = require("../config/index").cloudinaryConfig;

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Ingrident", required: true },
  ], // References Ingredient documents
  steps: { type: [String], required: true }, // Array of preparation steps
  image: {
    url: { type: String },
    public_id: { type: String },
  },
  prepTime: { type: Number, required: true }, // Preparation time in minutes
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  createdAt: { type: Date, default: Date.now },
});

// Remove image from cloudinary before removing recipe
recipeSchema.pre("remove", async function (next) {
  try {
    if (this?.image?.public_id) {
      await cloudinary.uploader.destroy(this.image.public_id);
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Remove all ratings before removing recipe
recipeSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("Rating").deleteMany({ recipe: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

// Remove all comments before removing recipe
recipeSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("Comment").deleteMany({
      entityId: this._id,
      entityType: "Recipe",
    });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
