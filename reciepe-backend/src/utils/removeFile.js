const fs = require("fs");
const BaseError = require("../error/base.error");

function removeFile(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    throw new BaseError("FileNotFound", 404, "File not found.");
  }
}

module.exports = removeFile;
