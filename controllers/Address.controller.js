
const AddressService = require("../services/Address.service");


exports.createAddress = async (req, res) => {
  try {
    const { street, city, state, pincode } = req.body;
    const newAddress = await AddressService.createAddress(street, city, state, pincode);
    res.status(201).json({
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await AddressService.getAllAddresses();
    res.status(200).json({
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await AddressService.getAddressById(id);
    res.status(200).json({
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const address = await AddressService.updateAddress(id, updateData);
    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await AddressService.deleteAddress(id);
    res.status(200).json({
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || "Internal server error", error: error.message });
  }
};


exports.getAddressesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await AddressService.getAddressesByUser(userId);
    res.status(200).json({
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.getAddressesByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const addresses = await AddressService.getAddressesByRestaurant(restaurantId);
    res.status(200).json({
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
