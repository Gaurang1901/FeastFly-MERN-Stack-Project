const mongoose = require("mongoose");
const { USER_ROLE } = require("./enums/UserRole.enum");

const User = {
  name: {
    type: String,
    required: true,
    minLength: [2, "Name must be at least 2 characters long"],
    maxLength: [50, "Name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    select: false, // Exclude password from queries by default
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Username must be at least 3 characters long"],
    maxLength: [30, "Username must be at most 30 characters long"],
  },
  role: {
    type: String,
    enum: [USER_ROLE.ADMIN, USER_ROLE.USER, USER_ROLE.OWNER],
    default: USER_ROLE.USER,
  },
  profilePhoto: {
    type: String,
    default: "../Assets/ProfilePic.png",
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
    match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Address",
  },
  contactDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Contact",
  },
   
};

const UserSchema = new mongoose.Schema(User, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);
