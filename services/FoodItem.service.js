
const Food = require("../models/enums/FoodItem.model");
const Restaurant = require("../models/Restaurant.model");
const Ingredient = require("../models/enums/Ingredient.model");

exports.createFoodItem = async (foodData, restaurantId) => {
  if (!foodData.name || !foodData.price) {
    throw { status: 400, message: "Name and price are required." };
  }
  const restaurant = await Restaurant.findById(restaurantId || foodData.restaurant);
  if (!restaurant) {
    throw { status: 404, message: "Restaurant not found" };
  }
  const newFood = new Food(foodData);
  const ingredient = await Ingredient.findById(foodData.ingredient);
  if (!ingredient) {
    throw { status: 404, message: "Ingredient not found" };
  }
  ingredient.quantity -= foodData.quantity;
  await ingredient.save();
  await newFood.save();
  restaurant.foodItems.push(newFood._id);
  await restaurant.save();
  return newFood;
};

exports.getAllFoodItems = async () => {
  return await Food.find();
};

exports.getFoodItemById = async (id) => {
  const foodItem = await Food.findById(id);
  if (!foodItem) {
    throw { status: 404, message: "Food item not found" };
  }
  return foodItem;
};

exports.updateFoodItem = async (id, updateData) => {
  const foodItem = await Food.findByIdAndUpdate(id, updateData, { new: true });
  if (!foodItem) {
    throw { status: 404, message: "Food item not found" };
  }
  return foodItem;
};

exports.deleteFoodItem = async (id) => {
  const foodItem = await Food.findByIdAndDelete(id);
  if (!foodItem) {
    throw { status: 404, message: "Food item not found" };
  }
  return foodItem;
};

exports.getFoodItemsByRestaurantId = async (restaurantId) => {
  return await Food.find({ restaurant: restaurantId });
};
