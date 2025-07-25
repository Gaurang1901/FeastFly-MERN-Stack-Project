const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    foodCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    images: {
      type: [String],
      validate: [arr => arr.length <= 1000, "Maximum of 1000 image URLs allowed"],
    },

    available: {
      type: Boolean,
      default: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    isVegetarian: {
      type: Boolean,
      default: false,
    },
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients",
      },
    ],
    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;
