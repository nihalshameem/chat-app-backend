const jwt = require("jsonwebtoken");
const { commonResJson } = require("../utils/commonUtils");

// Middleware to check JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Get token from Authorization header

  if (!token) {
    return res.status(401).json(commonResJson(null, "No token provided", "a"));
  }

  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Use your JWT secret key here
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(403).json(commonResJson(null, "Invalid token", "a"));
  }
};

module.exports = { verifyToken };
