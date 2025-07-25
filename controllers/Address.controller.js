const Address = require("../models/Address.model");

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    const { street, city, state, pincode } = req.body;
    if (!street || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newAddress = new Address({ street, city, state, pincode });
    await newAddress.save();
    res.status(201).json({
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json({
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get an address by ID
exports.getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update an address by ID
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const address = await Address.findByIdAndUpdate(id, updateData, { new: true });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete an address by ID
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address deleted successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
