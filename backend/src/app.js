const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI-powered Talent Intelligence Platform Backend is Running 🚀",
  });
});
// Student Routes
app.use("/api/student", studentRoutes);
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;