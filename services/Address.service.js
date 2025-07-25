
const Address = require("../models/Address.model");

exports.createAddress = async (street, city, state, pincode) => {
  if (!street || !city || !state || !pincode) {
    throw { status: 400, message: "All fields are required." };
  }
  const newAddress = new Address({ street, city, state, pincode });
  await newAddress.save();
  return newAddress;
};

exports.getAllAddresses = async () => {
  return await Address.find();
};

exports.getAddressById = async (id) => {
  const address = await Address.findById(id);
  if (!address) {
    throw { status: 404, message: "Address not found" };
  }
  return address;
};

exports.updateAddress = async (id, updateData) => {
  const address = await Address.findByIdAndUpdate(id, updateData, { new: true });
  if (!address) {
    throw { status: 404, message: "Address not found" };
  }
  return address;
};

exports.deleteAddress = async (id) => {
  const address = await Address.findByIdAndDelete(id);
  if (!address) {
    throw { status: 404, message: "Address not found" };
  }
  return address;
};

exports.getAddressesByUser = async (userId) => {
  return await Address.find({ user: userId });
};

exports.getAddressesByRestaurant = async (restaurantId) => {
  return await Address.find({ restaurant: restaurantId });
};
