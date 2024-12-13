// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend to connect from this origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Optional, if you're sending cookies with the request
  },
});

let onlineUsers = {}; // Initialize as an object to store username -> socket.id mapping

// Getter function for online users
const getOnlineUsers = () => Object.keys(onlineUsers); // Return keys (usernames)

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("join", (username) => {
    onlineUsers[username] = socket.id;
    io.emit("online-users", Object.keys(onlineUsers)); // Emit updated online users list
  });

  socket.on("disconnect", () => {
    Object.keys(onlineUsers).forEach((username) => {
      if (onlineUsers[username] === socket.id) {
        delete onlineUsers[username];
      }
    });
    console.log("🚀 ~ Object.keys ~ onlineUsers:", Object.keys(onlineUsers));
    io.emit("online-users", Object.keys(onlineUsers)); // Emit updated online users list
  });
});

// Export getOnlineUsers function
// module.exports = { getOnlineUsers }; // Ensure this is being exported
exports.getOnlineUsers = getOnlineUsers;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", verifyToken, userRoutes);
app.use("/api/chat", verifyToken, chatRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
