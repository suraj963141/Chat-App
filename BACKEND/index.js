import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./SoketIO/server.js";
// import path from "path";

dotenv.config();

// Middleware
app.use(express.json());

//  CORS configuration for your Vercel frontend
app.use(
  cors({
   
    origin: [
      "https://chat-app-git-main-suraj-kumars-projects-f6809a8c.vercel.app",
      "http://localhost:4000",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

const PORT = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log(" MongoDB Connected");
} catch (error) {
  console.error(" Error connecting to MongoDB:", error);
}

// API routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 Backend is running successfully",
    status: "OK",
  });
});

server.listen(PORT, () => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://chatapp-q2p8.onrender.com"
      : `http://localhost:${PORT}`;

  console.log("======================================");
  console.log("🚀 Server started successfully!");
  console.log(`🌐 Running at: ${url}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("======================================");
});
