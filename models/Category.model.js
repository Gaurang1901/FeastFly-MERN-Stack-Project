const mongoose = require("mongoose");

const Category = {
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  CategoryType:{
    type: String,
    enum:["Restaurant", "FoodItem"],
    default: "Restaurant",
    required: true
  }
};
const CategorySchema = new mongoose.Schema(Category, { timestamps: true });
module.exports = mongoose.model("Category", CategorySchema);
