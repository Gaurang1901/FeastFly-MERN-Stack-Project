const DiscountCoupon = require("../models/DiscountCoupon.model");
const Restaurnt = require("../models/Restaurant.model");


const createDiscountCopoun = async (couponData)=>{
    if(!couponData || !couponData.code || !couponData.discount || !couponData.restaurantId) {
        throw new Error("Invalid coupon data");
    }
    return await DiscountCoupon.create(couponData);
}