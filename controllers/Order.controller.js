
const OrderService = require("../services/Order.service");


exports.createOrder = async (req, res) => {
  try {
    const { userId, restaurantId, foodItems, quantity, totalPrice, orderStatus, deliveryAddressId } = req.body;
    const newOrder = await OrderService.createOrder({ userId, restaurantId, foodItems, quantity, totalPrice, orderStatus, deliveryAddressId });
    res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    res.status(200).json({ message: "Order fetched successfully", data: order });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const order = await OrderService.updateOrder(id, updateData);
    res.status(200).json({ message: "Order updated successfully", data: order });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.deleteOrder(id);
    res.status(200).json({ message: "Order deleted successfully", data: order });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};
