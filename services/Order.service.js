
const Order = require("../models/Order.model");
const User = require("../models/User.Model");
const Restaurant = require("../models/Restaurant.model");

exports.createOrder = async ({ userId, restaurantId, foodItems, quantity, totalPrice, orderStatus, deliveryAddressId }) => {
  if (!userId || !restaurantId || !foodItems || !quantity || !totalPrice || !deliveryAddressId) {
    throw { status: 400, message: "All required fields must be provided." };
  }
  const user = await User.findById(userId);
  if (!user) throw { status: 404, message: "User not found" };
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) throw { status: 404, message: "Restaurant not found" };
  const newOrder = new Order({ userId, restaurantId, foodItems, quantity, totalPrice, orderStatus, deliveryAddressId });
  await newOrder.save();
  if (user.orders) {
    user.orders.push(newOrder._id);
    await user.save();
  }
  if (restaurant.orders) {
    restaurant.orders.push(newOrder._id);
    await restaurant.save();
  }
  return newOrder;
};

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw { status: 404, message: "Order not found" };
  return order;
};

exports.updateOrder = async (id, updateData) => {
  const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
  if (!order) throw { status: 404, message: "Order not found" };
  return order;
};

exports.deleteOrder = async (id) => {
  const order = await Order.findByIdAndDelete(id);
  if (!order) throw { status: 404, message: "Order not found" };
  return order;
};
