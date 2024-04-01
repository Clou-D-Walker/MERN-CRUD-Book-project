const mongoose = require("mongoose");

const link =
  "mongodb+srv://lawlovesnicorobin:law4robin@surya.uxsgorx.mongodb.net/Books";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URL || link);
    console.log(`Database connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
