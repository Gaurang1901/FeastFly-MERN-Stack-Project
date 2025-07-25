const Food = require("../models/enums/FoodItem.model");
const Restaurant = require("../models/Restaurant.model");
const Ingredient = require("../models/enums/Ingredient.model");
// Create a new food item
exports.createFoodItem = async (req, res) => {
  try {
    const foodData = req.body;
    if (!foodData.name || !foodData.price) {
      return res.status(400).json({ message: "Name and price are required." });
    }
    const restaurant = await Restaurant.findById(
      req.params.id || foodData.restaurant
    );
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const newFood = new Food(foodData);
    const ingredient = await Ingredient.findById(foodData.ingredient);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    ingredient.quantity -= foodData.quantity;
    await ingredient.save();
    await newFood.save();
    restaurant.foodItems.push(newFood._id);
    await restaurant.save();
    res.status(201).json({
      message: "Food item created successfully",
      data: newFood,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.status(200).json({
      message: "Food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get a food item by ID
exports.getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await Food.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item fetched successfully",
      data: foodItem,
    });
  } catch (error) {
    console.error("Error fetching food item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update a food item by ID
exports.updateFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const foodItem = await Food.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item updated successfully",
      data: foodItem,
    });
  } catch (error) {
    console.error("Error updating food item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Delete a food item by ID
exports.deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await Food.findByIdAndDelete(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({
      message: "Food item deleted successfully",
      data: foodItem,
    });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all food items by restaurant ID
exports.getFoodItemsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const foodItems = await Food.find({ restaurant: restaurantId });
    res.status(200).json({
      message: "Food items fetched successfully",
      data: foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items by restaurant:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
