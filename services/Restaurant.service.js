
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/user.model");
const Address = require("../models/Address.model");

exports.createRestaurant = async (data) => {
  const {
    name,
    description,
    address,
    cuisine,
    ownerId,
    restaurantCategory,
    email,
    openingTime,
    closingTime,
    contactDetails,
  } = data;
  if (!name || !ownerId || !email || !address) {
    throw { status: 400, message: "Name, ownerId, email, and address are required." };
  }
  const owner = await User.findById(ownerId);
  if (!owner) {
    throw { status: 404, message: "Owner not found" };
  }
  const existing = await Restaurant.findOne({ name, owner: owner._id });
  if (existing) {
    throw { status: 409, message: "Restaurant with this name already exists for this owner." };
  }
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
  owner.restaurant = newRestaurant._id;
  await owner.save();
  return newRestaurant;
};

exports.getAllRestaurants = async () => {
  return await Restaurant.find();
};

exports.getRestaurantById = async (id) => {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw { status: 404, message: "Restaurant not found" };
  }
  return restaurant;
};

exports.updateRestaurant = async (id, updateData) => {
  const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
  if (!restaurant) {
    throw { status: 404, message: "Restaurant not found" };
  }
  return restaurant;
};

exports.deleteRestaurant = async (id) => {
  const restaurant = await Restaurant.findByIdAndDelete(id);
  if (!restaurant) {
    throw { status: 404, message: "Restaurant not found" };
  }
  return restaurant;
};

exports.getRestaurantByUserId = async (userId) => {
  const restaurant = await Restaurant.findOne({ owner: userId });
  if (!restaurant) {
    throw { status: 404, message: "Restaurant not found for this user" };
  }
  return restaurant;
};
