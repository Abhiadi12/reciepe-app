const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const BaseError = require("../error/base.error");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

//info: error post hook , only trigger when error occur while db operation
userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(
      new BaseError(
        "ConflictError",
        409,
        "Please use a different name or email."
      )
    );
  } else {
    next(error);
  }
});
//info: Method which will avilable in user object
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
