const Restaurant = require("../models/Restaurant.model");
const User = require("../models/User.model");
const Address = require("../models/Address.model");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {

    const {
      name,
      description,
      address, // full address object
      cuisine,
      ownerId,
      restaurantCategory,
      email,
      openingTime,
      closingTime,
      contactDetails,
    } = req.body;

    // 1. Validate required fields

    if (!name || !ownerId || !email || !address) {
      return res
        .status(400)
        .json({ message: "Name, ownerId, email, and address are required." });
    }

    // 2. Check if owner exists
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // 3. Check for duplicate restaurant for this owner
    const existing = await Restaurant.findOne({ name, owner: owner._id });
    if (existing) {
      return res.status(409).json({
        message: "Restaurant with this name already exists for this owner.",
      });
    }


    // 4. Handle address: check if exists, else create
    let addressDoc = await Address.findOne({
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
    if (!addressDoc) {
      addressDoc = new Address(address);
      await addressDoc.save();
    }

    // 5. Create and save restaurant
    const newRestaurant = new Restaurant({
      name,
      description,
      location: addressDoc._id,
      cuisine,
      owner: owner._id,
      restaurantCategory,
      email,
      openingTime,
      closingTime,
      contactDetails,
    });

    await newRestaurant.save();

    // 5. Link restaurant to owner (if needed)
    owner.restaurant = newRestaurant._id;
    await owner.save();

    res.status(201).json({
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update a restaurant by ID
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant._id,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete a restaurant by ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json({
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get a restaurant by userId (ownerId)
exports.getRestaurantByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const restaurant = await Restaurant.findOne({ owner: userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found for this user" });
    }
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant by userId:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
