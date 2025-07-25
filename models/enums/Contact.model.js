const mongoose = require("mongoose");

const Contact = {
  contactNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Contact number must be a 10-digit number"],
  },
  alternateContactNumber: {
    type: String,
    match: [/^\d{10}$/, "Alternate contact number must be a 10-digit number"],
  },
  instagram: {
    type: String,
    match: [
      /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+$/,
      "Please enter a valid Instagram URL",
    ],
  },
  facebook: {
    type: String,
    match: [
      /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+$/,
      "Please enter a valid Facebook URL",
    ],
  },
  twitter: {
    type: String,
    match: [
      /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9._-]+$/,
      "Please enter a valid Twitter URL",
    ],
  },
  linkedin: {
    type: String,
    match: [
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+$/,
      "Please enter a valid LinkedIn URL",
    ],
  },
};

const ContactSchema = new mongoose.Schema(Contact, {
  timestamps: true,
});

const ContactModel = mongoose.model("Contact", ContactSchema);
module.exports = ContactModel;
