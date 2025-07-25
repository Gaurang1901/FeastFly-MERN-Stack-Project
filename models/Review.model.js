const mongoose = require("mongoose");

const Review = {
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
};

const ReviewSchema = new mongoose.Schema(Review, {
  timestamps: true,
});
module.exports = mongoose.model("Review", ReviewSchema);
