const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/TokenGenerator");

exports.register = async (req, res) => {
  const { userName, email, password, name, role } = req.body;
  console.log("Registering user:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      name,
      role,
    });
    // Save the user to the database
    const createdUser = await newUser.save();
    const token = generateToken(createdUser);
    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: createdUser._id,
        userName: createdUser.userName,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const userWithUserName = await User.findOne({ userName });
    const userWithEmail = await User.findOne({ email: userName });

    if (!userWithEmail && !userWithUserName) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const user = userWithUserName || userWithEmail;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "User logged in successfully",
      token: token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        phoneNumber: user.phoneNumber || null,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.params.id;
  const { userName, email, phoneNumber, profilePhoto } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, email, phoneNumber, profilePhoto },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        userName: updatedUser.userName,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePhoto: updatedUser.profilePhoto,
        phoneNumber: updatedUser.phoneNumber || null,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      message: "User deleted successfully",
      user: {
        id: deletedUser._id,
        userName: deletedUser.userName,
        email: deletedUser.email,
        role: deletedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
