const Order = require("../models/Order.model");
const User = require("../models/User.model");
const Restaurant = require("../models/Restaurant.model");

// Create a new order and map to user and restaurant
exports.createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, foodItems, quantity, totalPrice, orderStatus, deliveryAddressId } = req.body;
    if (!userId || !restaurantId || !foodItems || !quantity || !totalPrice || !deliveryAddressId) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }
    // Check user and restaurant existence
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    const newOrder = new Order({
      userId,
      restaurantId,
      foodItems,
      quantity,
      totalPrice,
      orderStatus,
      deliveryAddressId,
    });
    await newOrder.save();

    // Optionally, map order to user and restaurant if they have orders array
    if (user.orders) {
      user.orders.push(newOrder._id);
      await user.save();
    }
    if (restaurant.orders) {
      restaurant.orders.push(newOrder._id);
      await restaurant.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order updated successfully", data: order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully", data: order });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
