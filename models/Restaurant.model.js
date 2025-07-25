const mongoose = require("mongoose");

const Restaurant = {
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [50, "Name must be at most 50 characters long"],
  },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },

  contactDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Contact",
  },

  restaurantCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  openingTime: {
    type: String,
    required: true,
  },

  closingTime: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  foodItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
    },
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  images: {
    type: [String],
    validate: [
      (arr) => arr.length <= 1000,
      "Maximum of 1000 image URLs allowed",
    ],
  },

  isOpen: {
    type: Boolean,
    default: false,
  },
};

const RestaurantSchema = new mongoose.Schema(Restaurant, {
  timestamps: true,
});

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);
module.exports = RestaurantModel;
