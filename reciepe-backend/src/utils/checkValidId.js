const mongoose = require("mongoose");

function checkValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = checkValidId;
