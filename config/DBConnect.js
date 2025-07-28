const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoCreate: true });
    console.log("Database connected successfully");
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Database ping successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
module.exports = DBConnect;
