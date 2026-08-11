const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
} = require("../controllers/expenseController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addExpense);

router.get("/", authMiddleware, getExpenses);

module.exports = router;