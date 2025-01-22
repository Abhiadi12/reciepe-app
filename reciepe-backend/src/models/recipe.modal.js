const mongoose = require("mongoose");

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
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recipe", recipeSchema);

// ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }], // References Rating documents
// comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // References Comment documents
// averageRating: { type: Number, default: 0 }, // Average of all ratings
