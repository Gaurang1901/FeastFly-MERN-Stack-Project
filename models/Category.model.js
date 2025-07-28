const mongoose = require("mongoose");

const Category = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  categoryType:{
    type: String,
    enum:["Restaurant", "FoodItem"],
    default: "Restaurant",
    required: true
  }
};
const CategorySchema = new mongoose.Schema(Category, { timestamps: true });
module.exports = mongoose.model("Category", CategorySchema);
