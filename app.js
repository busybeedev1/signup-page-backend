import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routers/userRouter.js";

const app = express();

const port = process.env.PORT || 4017;

// ============================
// CORS
// ============================

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4017",
    "http://localhost:3030",

    "https://signup-page-frontend.vercel.app",
    "https://signup-page-frontend-dnolzl8z2-busybeedev2.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ============================
// JSON
// ============================

app.use(express.json());

// ============================
// DATABASE
// ============================

async function connectingDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connected: You Can Proceed!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

connectingDatabase();

// ============================
// TEST ROUTE
// ============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Signup backend is working!",
  });
});

// ============================
// ROUTES
// ============================

app.use("/api/v1", router);

// ============================
// SERVER
// ============================

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});