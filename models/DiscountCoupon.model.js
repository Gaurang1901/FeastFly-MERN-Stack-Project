const mongoose = require("mongoose");

const discountCoupon = {
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  restaurant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  }
};

const DiscountCouponSchema = new mongoose.Schema(discountCoupon, {
  timestamps: true,
});
const DiscountCoupon = mongoose.model("DiscountCoupon", DiscountCouponSchema);
module.exports = DiscountCoupon;
