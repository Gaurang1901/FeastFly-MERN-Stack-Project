const mongoose = require("mongoose");

const Ingredients = {
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  }
};

const IngredientsSchema = new mongoose.Schema(Ingredients, { timestamps: true });
module.exports = mongoose.model("Ingredients", IngredientsSchema);
