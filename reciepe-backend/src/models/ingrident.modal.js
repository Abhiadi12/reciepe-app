const mongoose = require("mongoose");
const BaseError = require("../error/base.error");

const ingridentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

ingridentSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.toLowerCase();
  }
  next();
});

ingridentSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(
      new BaseError(
        `Ingredient name "${doc.name}" already exists. Please use a different name.`
      )
    );
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Ingrident", ingridentSchema);
