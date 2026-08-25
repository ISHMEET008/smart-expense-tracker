const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateIncome,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Update income - protected route
router.put("/income", authMiddleware, updateIncome);

module.exports = router;