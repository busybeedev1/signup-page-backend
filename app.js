import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import useRouter from "./routers/userRouter.js";

const app = express();

// ===============================
// PORT
// ===============================
const port = process.env.PORT || 4017;


// ===============================
// ALLOWED FRONTEND ORIGINS
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4017",
  "http://localhost:3030",
  "https://signup-page-frontend.vercel.app",
];


// ===============================
// MIDDLEWARE
// ===============================

// Parse JSON request bodies
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);


// ===============================
// DATABASE CONNECTION
// ===============================
async function connectingDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("Database Connected: You Can Proceed!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

connectingDatabase();


// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Signup backend is working!",
  });
});


// ===============================
// API ROUTES
// ===============================
app.use("/api/v1", useRouter);


// ===============================
// START SERVER
// ===============================
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});