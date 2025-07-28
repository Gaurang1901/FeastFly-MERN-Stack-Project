const discountCouponService = require("../services/DiscountCoupon.service");

exports.createDiscountCoupon = async (req, res) => {
  try {
    const {
      code,
      discountPercentage,
      expiryDate,
      minimumOrderValue,
      description,
      restaurant,
    } = req.body;
    const newCoupon = await discountCouponService.createDiscountCoupon({
      code,
      discountPercentage,
      expiryDate,
      minimumOrderValue,
      description,
      restaurant,
    });
    return res.status(201).json({
      message: "Discount coupon created successfully",
      data: newCoupon,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllDiscountCoupons = async (req, res) => {
  try {
    const coupons = await discountCouponService.getAllDiscountCoupons();
    return res.status(200).json({
      message: "Discount coupons fetched successfully",
      data: coupons,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getDiscountCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await discountCouponService.getDiscountCouponById(id);
    return res.status(200).json({
      message: "Discount coupon fetched successfully",
      data: coupon,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};

exports.updateDiscountCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCoupon = await discountCouponService.updateDiscountCoupon(
      id,
      updateData
    );
    return res.status(200).json({
      message: "Discount coupon updated successfully",
      data: updatedCoupon,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};

exports.deleteDiscountCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await discountCouponService.deleteDiscountCoupon(id);
    return res.status(200).json({
      message: "Discount coupon deleted successfully",
      data: deletedCoupon,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};

exports.getDiscountCouponsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const coupons = await discountCouponService.getDiscountCouponsByRestaurant(
      restaurantId
    );
    return res.status(200).json({
      message: "Discount coupons for restaurant fetched successfully",
      data: coupons,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "Internal server error",
      error: error.message,
    });
  }
};
