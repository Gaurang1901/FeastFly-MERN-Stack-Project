
const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/TokenGenerator");

exports.register = async ({ userName, email, password, name, role }) => {
  const existingUser = await User.findOne({ email });
  const existingUserName = await User.findOne({ userName });
  if (existingUser) {
    throw { status: 400, message: "User already exists" };
  }
  if (existingUserName) {
    throw { status: 400, message: "Username already exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ userName, email, password: hashedPassword, name, role });
  const createdUser = await newUser.save();
  const token = generateToken(createdUser);
  return {
    token,
    user: {
      id: createdUser._id,
      userName: createdUser.userName,
      email: createdUser.email,
      role: createdUser.role,
    },
  };
};

exports.login = async ({ userName, password }) => {
  const userWithUserName = await User.findOne({ userName });
  const userWithEmail = await User.findOne({ email: userName });
  if (!userWithEmail && !userWithUserName) {
    throw { status: 400, message: "Invalid username or password" };
  }
  const user = userWithUserName || userWithEmail;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw { status: 400, message: "Invalid username or password" };
  }
  const token = generateToken(user);
  return {
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    },
  };
};

exports.getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  return {
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    profilePhoto: user.profilePhoto,
    phoneNumber: user.phoneNumber || null,
  };
};

exports.updateProfile = async (userId, { userName, email, phoneNumber, profilePhoto }) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { userName, email, phoneNumber, profilePhoto },
    { new: true }
  );
  if (!updatedUser) {
    throw { status: 404, message: "User not found" };
  }
  return {
    id: updatedUser._id,
    userName: updatedUser.userName,
    email: updatedUser.email,
    role: updatedUser.role,
    profilePhoto: updatedUser.profilePhoto,
    phoneNumber: updatedUser.phoneNumber || null,
  };
};

exports.deleteProfile = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw { status: 404, message: "User not found" };
  }
  return {
    id: deletedUser._id,
    userName: deletedUser.userName,
    email: deletedUser.email,
    role: deletedUser.role,
  };
};
