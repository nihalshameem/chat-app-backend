const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/User"); // Import the User model
const { commonResJson } = require("../utils/commonUtils");

const main = require("../server");
const Message = require("../models/Message");

const router = express.Router();

mongoose
  .connect(process.env.DATABASE_URL || "mongodb://localhost:27017/myapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUser = req.user.username;
    const chats = await Message.find({
      sender: [userId, loggedInUser],
      receiver: [userId, loggedInUser],
    }).select(["sender", "receiver", "content", "createdAt"]).sort({ createdAt: 1 });

    if (!chats) {
      res.status(200).json(commonResJson(chats, [], "s"));
    }

    res.status(200).json(commonResJson(chats, "", "s"));
  } catch (err) {
    console.log("🚀 ~ router.post ~ err:", err);
    res.status(500).json(commonResJson(null, "Error fetching messages", "e"));
  }
});

router.post("/send", async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const sender = req.user.username;
    if (receiver === sender) {
      res
        .status(400)
        .json(commonResJson(null, "You cannot send message to yourself", "e"));
    }

    const msg = new Message({
      sender,
      receiver,
      content,
    });
    msg
      .save()
      .then((savedMessage) => {
        // Only include 'sender', 'receiver', 'content', and 'createdAt'
        const responseMessage = {
          sender: savedMessage.sender,
          receiver: savedMessage.receiver,
          content: savedMessage.content,
          createdAt: savedMessage.createdAt,
        };
        res
          .status(200)
          .json(
            commonResJson(responseMessage, "Message sent successfull", "s")
          );
      })
      .catch((error) => {
        console.log("Error saving message:", error);
        res
          .status(500)
          .json(commonResJson(null, "Error sending messages", "e"));
      });
  } catch (err) {
    console.log("🚀 ~ router.post ~ err:", err);
    res.status(500).json(commonResJson(null, "Error sending messages", "e"));
  }
});

module.exports = router;
