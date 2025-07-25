const mongoose = require("mongoose");

const Order = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },

  foodItems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "FoodItem",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Delivered",
      "Cancelled",
      "Returned",
      "Delayed",
    ],
    default: "Pending",
  },

  deliveryAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Address",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
};

const OrderSchema = new mongoose.Schema(Order, { timestamps: true });
module.exports = mongoose.model("Order", OrderSchema);
