const mongoose = require("mongoose");

 const CONNECTDB = async (url) => {
  try {
    await mongoose.connect(url);
    mongoose.set("strictQuery", false);
    console.log("Database connected ✨✨");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = {CONNECTDB}