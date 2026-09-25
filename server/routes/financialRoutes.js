const express = require("express");

const {
  saveFinancialSetup,
  getFinancialSummary,
  updateFinancialDetails,
} = require("../controllers/financialController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Financial setup during onboarding
router.put(
  "/setup",
  authMiddleware,
  saveFinancialSetup
);


// Get complete financial summary
router.get(
  "/summary",
  authMiddleware,
  getFinancialSummary
);


// Update financial details from Wallet
router.put(
  "/update",
  authMiddleware,
  updateFinancialDetails
);


module.exports = router;