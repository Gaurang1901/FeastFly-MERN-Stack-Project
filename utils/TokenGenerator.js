const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    username: user.username,
  };
  const secretKey = process.env.SECRET_KEY;
  const expiry = process.env.JWT_EXPIRY || "1h"; // Default to 1 hour if not set

  const token = jwt.sign(payload, secretKey, {
    expiresIn: expiry,
    algorithm: "HS256",
    issuer: "FeastFly",
    audience: "FeastFlyUsers",
  });
  return token;
};

module.exports = generateToken;
