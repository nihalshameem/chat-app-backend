const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/User"); // Import the User model
const { commonResJson } = require("../utils/commonUtils");

const main = require("../server");

const router = express.Router();

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost:27017/myapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

router.post("/", async (req, res) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username }).select("username");

    if (!user) {
      return res.status(404).json(commonResJson(null, "User not found", "e"));
    }

    res.status(200).json(commonResJson(user, "", "s"));
  } catch (err) {
    res.status(500).json(commonResJson(null, "Error fetching user", "e"));
  }
});

// Get all users except the logged-in user
// userRoutes.js
router.post("/all-users", async (req, res) => {
  try {
    const loggedInUser = req.user.username;
    const users = await User.find({ username: { $ne: loggedInUser } }).select(
      "username"
    );

    res.status(200).json(commonResJson(users, "", "s"));
  } catch (err) {
    console.log("🚀 ~ router.post ~ err:", err);
    res.status(500).json(commonResJson(null, "Error fetching users", "e"));
  }
});

module.exports = router;
