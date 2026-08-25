const express = require("express");

const {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
} = require("../controllers/budgetController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", addBudget);

router.get("/", getBudgets);

router.get("/summary", getBudgetSummary);

router.put("/:id", updateBudget);

router.delete("/:id", deleteBudget);

module.exports = router;