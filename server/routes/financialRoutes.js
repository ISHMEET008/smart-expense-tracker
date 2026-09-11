const express = require("express");

const {
  saveFinancialSetup,
} = require("../controllers/financialController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/setup", authMiddleware, saveFinancialSetup);

module.exports = router;