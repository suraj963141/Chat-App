import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const httpServer = http.createServer(app);

//  Allow frontend from Vercel
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:4000",
      "https://chat-app-git-main-suraj-kumars-projects-f6809a8c.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store user sockets
const users = {};

// Utility to get receiver socket
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// Handle connections
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log(" Connected users:", users);
  }

  io.emit("getOnline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log(" Client disconnected:", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

export { app, io, httpServer as server };
