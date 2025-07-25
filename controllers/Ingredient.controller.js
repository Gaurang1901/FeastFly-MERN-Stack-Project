const Ingredient = require("../models/Ingredients.model");
const Restaurant = require("../models/Restaurant.model");

// Create a new ingredient and map to restaurant
exports.createIngredient = async (req, res) => {
  try {
    const { name, quantity, restaurant } = req.body;
    if (!name || !quantity || !restaurant) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // Check restaurant existence
    const rest = await Restaurant.findById(restaurant);
    if (!rest) return res.status(404).json({ message: "Restaurant not found" });

    const newIngredient = new Ingredient({ name, quantity, restaurant });
    await newIngredient.save();

    // Optionally, map ingredient to restaurant if it has an ingredients array
    if (rest.ingredients) {
      rest.ingredients.push(newIngredient._id);
      await rest.save();
    }

    res.status(201).json({
      message: "Ingredient created successfully",
      data: newIngredient,
    });
  } catch (error) {
    console.error("Error creating ingredient:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all ingredients
exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json({ message: "Ingredients fetched successfully", data: ingredients });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get ingredient by ID
exports.getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findById(id);
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
    res.status(200).json({ message: "Ingredient fetched successfully", data: ingredient });
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update ingredient by ID
exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const ingredient = await Ingredient.findByIdAndUpdate(id, updateData, { new: true });
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
    res.status(200).json({ message: "Ingredient updated successfully", data: ingredient });
  } catch (error) {
    console.error("Error updating ingredient:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete ingredient by ID
exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndDelete(id);
    if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
    res.status(200).json({ message: "Ingredient deleted successfully", data: ingredient });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
// Get all ingredients by restaurant ID
exports.getIngredientsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredients = await Ingredient.find({ restaurant: restaurantId });
    res.status(200).json({
      message: "Ingredients fetched successfully",
      data: ingredients,
    });
  } catch (error) {
    console.error("Error fetching ingredients by restaurant:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};