const mongoose = require("mongoose");

// Define the Message Schema
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
