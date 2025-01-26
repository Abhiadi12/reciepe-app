const express = require("express");
const v1Router = express.Router();

v1Router.use("/ingridents", require("./ingrident.route"));
v1Router.use("/users", require("./user.route"));
v1Router.use("/recipes", require("./recipe.route"));
v1Router.use("/ratings", require("./rating.route"));
v1Router.use("/recipes/:id/comments", require("./comment.route"));

module.exports = v1Router;
