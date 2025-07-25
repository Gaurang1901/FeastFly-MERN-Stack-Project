
const Ingredient = require("../models/Ingredients.model");
const Restaurant = require("../models/Restaurant.model");

exports.createIngredient = async ({ name, quantity, restaurant }) => {
  if (!name || !quantity || !restaurant) {
    throw { status: 400, message: "All fields are required." };
  }
  const rest = await Restaurant.findById(restaurant);
  if (!rest) throw { status: 404, message: "Restaurant not found" };
  const newIngredient = new Ingredient({ name, quantity, restaurant });
  await newIngredient.save();
  if (rest.ingredients) {
    rest.ingredients.push(newIngredient._id);
    await rest.save();
  }
  return newIngredient;
};

exports.getAllIngredients = async () => {
  return await Ingredient.find();
};

exports.getIngredientById = async (id) => {
  const ingredient = await Ingredient.findById(id);
  if (!ingredient) throw { status: 404, message: "Ingredient not found" };
  return ingredient;
};

exports.updateIngredient = async (id, updateData) => {
  const ingredient = await Ingredient.findByIdAndUpdate(id, updateData, { new: true });
  if (!ingredient) throw { status: 404, message: "Ingredient not found" };
  return ingredient;
};

exports.deleteIngredient = async (id) => {
  const ingredient = await Ingredient.findByIdAndDelete(id);
  if (!ingredient) throw { status: 404, message: "Ingredient not found" };
  return ingredient;
};

exports.getIngredientsByRestaurant = async (restaurantId) => {
  return await Ingredient.find({ restaurant: restaurantId });
};
