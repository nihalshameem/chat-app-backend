// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/User"); // Import the User model
const { commonResJson } = require("../utils/commonUtils");

const router = express.Router();

// Secret key for JWT signing
const SECRET_KEY = process.env.JWT_KEY || "your-secret-key";

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost:27017/myapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json(commonResJson(null, "Username already exists", "e"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json(
        commonResJson({ username, token }, "User registered successfully", "s")
      );
  } catch (error) {
    console.error(error);
    res.status(500).json(commonResJson(null, "Internal server error", "e"));
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json(commonResJson(null, "Invalid credentials", "e"));
    }

    // Compare the entered password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(commonResJson(null, "Invalid credentials", "e"));
    }

    // Create JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json(commonResJson({ username, token }, "Your logged in", "s"));
  } catch (error) {
    console.error(error);
    res.status(500).json(commonResJson(null, "Internal server error", "e"));
  }
});

module.exports = router;
