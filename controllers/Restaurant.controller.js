
const RestaurantService = require("../services/Restaurant.service");


exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await RestaurantService.createRestaurant(req.body);
    res.status(201).json({
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantService.getAllRestaurants();
    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantService.getRestaurantById(id);
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const restaurant = await RestaurantService.updateRestaurant(id, updateData);
    res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant._id,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantService.deleteRestaurant(id);
    res.status(200).json({
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getRestaurantByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const restaurant = await RestaurantService.getRestaurantByUserId(userId);
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};
