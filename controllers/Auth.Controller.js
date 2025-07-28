const AuthService = require("../services/Auth.service");

exports.register = async (req, res) => {
  try {
    const { userName, email, password, name, role } = req.body;
    const result = await AuthService.register({
      userName,
      email,
      password,
      name,
      role,
    });
    return res.status(201).json({
      message: "User registered successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({
        message: error.message || "Internal server error",
        error: error.message,
      });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(req.body);

    const result = await AuthService.login({ userName, password });
    return res.status(200).json({
      message: "User logged in successfully",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({
        message: error.message || "Internal server error",
        error: error.message,
      });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await AuthService.getUserProfile(userId);
    return res.status(200).json({ user });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({
        message: error.message || "Internal server error",
        error: error.message,
      });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, email, phoneNumber, profilePhoto } = req.body;
    const user = await AuthService.updateProfile(userId, {
      userName,
      email,
      phoneNumber,
      profilePhoto,
    });
    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({
        message: error.message || "Internal server error",
        error: error.message,
      });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await AuthService.deleteProfile(userId);
    return res.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    const status = error.status || 500;
    return res
      .status(status)
      .json({
        message: error.message || "Internal server error",
        error: error.message,
      });
  }
};
