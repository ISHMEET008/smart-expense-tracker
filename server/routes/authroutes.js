const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateIncome,
   getIncome,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Update income - protected route
router.put("/income", authMiddleware, updateIncome);

router.get("/income", authMiddleware, getIncome);

module.exports = router;