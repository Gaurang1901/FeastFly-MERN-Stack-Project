
const Restaurant = require("../models/Restaurant.model");
const User = require("../models/user.model");
const Address = require("../models/Address.model");
const ContactDetails = require("../models/Contact.model");
const CategoryModel = require("../models/Category.model");

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
  let contactDetailsDoc = {
    phoneNo: contactDetails?.phoneNo,
    website: contactDetails?.website,
    instagram: contactDetails?.instagram,
    facebook: contactDetails?.facebook,
    twitter: contactDetails?.twitter,
  };
  if (!contactDetailsDoc) {
    contactDetailsDoc = {
      phoneNo: null,
      website: null,
      instagram: null,
      facebook: null,
      twitter: null,
    };
  }
  contactDetailsDoc = await ContactDetails.findOne(contactDetailsDoc);
  if (!contactDetailsDoc) {
    contactDetailsDoc = new ContactDetails(contactDetails);
    await contactDetailsDoc.save();
  }
  addressDoc = await Address.findOne({
    street: address.street,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  });

  if (!addressDoc) {
    addressDoc = new Address(address);
    await addressDoc.save();
  }

  let restaurantCategoryDoc = {
    name: restaurantCategory,
    CategoryType: "Restaurant",
  };
  restaurantCategoryDoc = await CategoryModel.findOne({ name: restaurantCategory, CategoryType: "Restaurant" });
  if (!restaurantCategoryDoc) {
    restaurantCategoryDoc = new CategoryModel({
      name: restaurantCategory,
      description: "",
      CategoryType: "Restaurant",
    });
    await restaurantCategoryDoc.save();
  };
  const newRestaurant = new Restaurant({
    name,
    description,
    location: addressDoc._id,
    cuisine,
    owner: owner._id,
    restaurantCategory: restaurantCategoryDoc._id,
    email,
    openingTime,
    closingTime,
    contactDetails: contactDetailsDoc._id,
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
