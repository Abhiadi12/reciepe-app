const mongoose = require("mongoose");
const { DB_URL, NODE_ENV } = require("./server.config");

async function connectToDB() {
  try {
    if (NODE_ENV === "development") {
      await mongoose.connect(DB_URL);
      console.log("Connected to the database");
    }
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

module.exports = connectToDB;
