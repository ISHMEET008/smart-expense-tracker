const express = require("express");

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getFinancialSummary,
  getExpenseReport,
  getAnalytics,
} = require("../controllers/expenseController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All expense routes require login
router.use(authMiddleware);

// Add expense
router.post("/", addExpense);

// Get all expenses
router.get("/", getExpenses);



// Get financial summary
router.get("/summary", getFinancialSummary);

router.get("/report", getExpenseReport);

router.get("/analytics", getAnalytics);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);


module.exports = router;