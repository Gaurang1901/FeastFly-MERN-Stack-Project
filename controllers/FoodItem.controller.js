
const FoodItemService = require("../services/FoodItem.service");

exports.createFoodItem = async (req, res) => {
  try {
    const foodData = req.body;
    const restaurantId = req.params.id || foodData.restaurant;
    const newFood = await FoodItemService.createFoodItem(foodData, restaurantId);
    res.status(201).json({
      message: "Food item created successfully",
      data: newFood,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItemService.getAllFoodItems();
    res.status(200).json({
      message: "Food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItemService.getFoodItemById(id);
    res.status(200).json({
      message: "Food item fetched successfully",
      data: foodItem,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const foodItem = await FoodItemService.updateFoodItem(id, updateData);
    res.status(200).json({
      message: "Food item updated successfully",
      data: foodItem,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItemService.deleteFoodItem(id);
    res.status(200).json({
      message: "Food item deleted successfully",
      data: foodItem,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getFoodItemsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodItems = await FoodItemService.getFoodItemsByRestaurantId(restaurantId);
    res.status(200).json({
      message: "Food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
