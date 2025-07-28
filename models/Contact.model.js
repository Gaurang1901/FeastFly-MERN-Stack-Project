const mongoose = require("mongoose");

const contactDetails = {
  phoneNo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
  },
  website: {
    type: String,
    match: [
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
      "Please enter a valid website URL",
    ],
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
};

const ContactSchema = new mongoose.Schema(contactDetails, { timestamps: true });
module.exports = mongoose.model("Contact", ContactSchema);
