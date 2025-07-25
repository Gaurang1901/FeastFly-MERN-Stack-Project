
const IngredientService = require("../services/Ingredient.service");


exports.createIngredient = async (req, res) => {
  try {
    const { name, quantity, restaurant } = req.body;
    const newIngredient = await IngredientService.createIngredient({ name, quantity, restaurant });
    res.status(201).json({
      message: "Ingredient created successfully",
      data: newIngredient,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientService.getAllIngredients();
    res.status(200).json({ message: "Ingredients fetched successfully", data: ingredients });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await IngredientService.getIngredientById(id);
    res.status(200).json({ message: "Ingredient fetched successfully", data: ingredient });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const ingredient = await IngredientService.updateIngredient(id, updateData);
    res.status(200).json({ message: "Ingredient updated successfully", data: ingredient });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await IngredientService.deleteIngredient(id);
    res.status(200).json({ message: "Ingredient deleted successfully", data: ingredient });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};

exports.getIngredientsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredients = await IngredientService.getIngredientsByRestaurant(restaurantId);
    res.status(200).json({
      message: "Ingredients fetched successfully",
      data: ingredients,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};