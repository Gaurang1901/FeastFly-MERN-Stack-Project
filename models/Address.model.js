const mongoose = require("mongoose");

const Address = {
  street: {
    type: String,
    required: true,
    minLength: [3, "Street must be at least 3 characters long"],
    maxLength: [100, "Street must be at most 100 characters long"],
  },

  city: {
    type: String,
    required: true,
    minLength: [2, "City must be at least 2 characters long"],
    maxLength: [50, "City must be at most 50 characters long"],
  },
  state: {
    type: String,
    required: true,
    minLength: [2, "State must be at least 2 characters long"],
    maxLength: [50, "State must be at most 50 characters long"],
  },
  pincode: {
    type: String,
    required: true,
    minLength: [6, "Pincode must be at least 6 characters long"],
    maxLength: [6, "Pincode must be at most 6 characters long"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
};

const AddressSchema = new mongoose.Schema(Address, {
  timestamps: true,
});

const AddressModel = mongoose.model("Address", AddressSchema);
module.exports = AddressModel;
