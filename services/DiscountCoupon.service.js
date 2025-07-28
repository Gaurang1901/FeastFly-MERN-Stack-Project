const DiscountCoupon = require("../models/DiscountCoupon.model");
const Restaurnt = require("../models/Restaurant.model");

const createDiscountCopoun = async (couponData) => {
  if (
    !couponData ||
    !couponData.code ||
    !couponData.discount ||
    !couponData.restaurantId
  ) {
    throw new Error("Invalid coupon data");
  }
  const restaurant = await Restaurnt.findById(couponData.restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const existingCoupon = await DiscountCoupon.findOne({
    code: couponData.code,
    restaurantId: couponData.restaurantId,
  });
  if (existingCoupon) {
    throw new Error("Coupon code already exists");
  }
  couponData.restaurantId = restaurant._id;
  couponData.createdAt = new Date();
  couponData.updatedAt = new Date();
  couponData.isActive = true; // Default to active
  couponData.discount = parseFloat(couponData.discount);
  couponData.minimumOrderValue = parseFloat(couponData.minimumOrderValue || 0);
  couponData.expiryDate = new Date(couponData.expiryDate);
  return await DiscountCoupon.create(couponData);
};

const getAllDiscountCoupons = async () => {
  return await DiscountCoupon.find().populate("restaurantId", "name");
};

const getDiscountCouponById = async (id) => {
  const discountCoupon = await DiscountCoupon.findById(id).populate(
    "restaurantId",
    "name"
  );
  if (!discountCoupon) {
    throw new Error("Discount coupon not found");
  }
  return discountCoupon;
};

const updateDiscountCoupon = async (id, couponData) => {
  if (
    !couponData ||
    !couponData.code ||
    !couponData.discount ||
    !couponData.restaurantId
  ) {
    throw new Error("Invalid coupon data");
  }
  const restaurant = await Restaurnt.findById(couponData.restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const existingCoupon = await DiscountCoupon.findOne({
    code: couponData.code,
    restaurantId: couponData.restaurantId,
  });
  if (existingCoupon) {
    throw new Error("Coupon code already exists");
  }
  couponData.restaurantId = restaurant._id;
  couponData.createdAt = new Date();
  couponData.updatedAt = new Date();
  couponData.isActive = true; // Default to active
  couponData.discount = parseFloat(couponData.discount);
  couponData.minimumOrderValue = parseFloat(couponData.minimumOrderValue || 0);
  couponData.expiryDate = new Date(couponData.expiryDate);
  const updatedCoupon = await DiscountCoupon.findByIdAndUpdate(id, couponData, {
    new: true,
  }).populate("restaurantId", "name");
  if (!updatedCoupon) {
    throw new Error("Discount coupon not found");
  }
  return updatedCoupon;
};

const deleteDiscountCoupon = async (id) => {
  const deletedCoupon = await DiscountCoupon.findByIdAndDelete(id);
  if (!deletedCoupon) {
    throw new Error("Discount coupon not found");
  }
  return deletedCoupon;
};

const getDiscountCouponsByRestaurant = async (restaurantId) => {
  const restaurant = await Restaurnt.findById(restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  return await DiscountCoupon.find({ restaurantId: restaurant._id }).populate(
    "restaurantId",
    "name"
  );
};

module.exports = {
  createDiscountCopoun,
  getAllDiscountCoupons,
  getDiscountCouponById,
  updateDiscountCoupon,
  deleteDiscountCoupon,
  getDiscountCouponsByRestaurant,
};
