const mongoose = require("mongoose");
const BaseError = require("../error/base.error");

const ratingSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Ensure a user can only rate a recipe once -> it's create a compound index
ratingSchema.index({ recipe: 1, user: 1 }, { unique: true });

ratingSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(
      new BaseError(
        `ConflictError.`,
        409,
        "You have already rated this recipe."
      )
    );
  } else {
    next(error);
  }
});

// Remove rating from recipe's ratings array after removing rating
ratingSchema.post("findByIdAndDelete", async function (doc) {
  try {
    await mongoose.model("Recipe").findByIdAndUpdate(doc.recipe, {
      $pull: { ratings: doc._id },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Rating", ratingSchema);
