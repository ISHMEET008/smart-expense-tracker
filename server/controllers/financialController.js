const User = require("../models/User");
const Expense = require("../models/Expense");

// Calculate current month's actual spending
const getCurrentMonthSpending = async (userId) => {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const endDate = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  const expenses = await Expense.find({
    user: userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  return expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );
};


// Get complete financial summary
const getFinancialSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const essentials = user.monthlyEssentials || {};

    const essentialExpenses =
      Number(essentials.rent || 0) +
      Number(essentials.food || 0) +
      Number(essentials.bills || 0) +
      Number(essentials.transport || 0) +
      Number(essentials.other || 0);

    const actualSpending = await getCurrentMonthSpending(req.user.id);

    const income = Number(user.monthlyIncome || 0);

    const availableAfterEssentials =
      income - essentialExpenses;

    const currentBalance =
      availableAfterEssentials - actualSpending;

    res.status(200).json({
      success: true,

      income,

      monthlyEssentials: {
        rent: Number(essentials.rent || 0),
        food: Number(essentials.food || 0),
        bills: Number(essentials.bills || 0),
        transport: Number(essentials.transport || 0),
        other: Number(essentials.other || 0),
      },

      essentialExpenses,

      availableAfterEssentials,

      actualSpending,

      currentBalance,

      financialSetupCompleted:
        user.financialSetupCompleted,
    });

  } catch (error) {
    console.log("Financial Summary Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Save financial setup during onboarding
const saveFinancialSetup = async (req, res) => {
  try {
    const {
      monthlyIncome,
      rent,
      food,
      bills,
      transport,
      other,
    } = req.body;

    if (
      monthlyIncome === undefined ||
      Number(monthlyIncome) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid monthly income",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.monthlyIncome = Number(monthlyIncome);

    user.monthlyEssentials = {
      rent: Number(rent) || 0,
      food: Number(food) || 0,
      bills: Number(bills) || 0,
      transport: Number(transport) || 0,
      other: Number(other) || 0,
    };

    user.financialSetupCompleted = true;

    await user.save();

    const totalEssentials =
      user.monthlyEssentials.rent +
      user.monthlyEssentials.food +
      user.monthlyEssentials.bills +
      user.monthlyEssentials.transport +
      user.monthlyEssentials.other;

    const availableMoney =
      user.monthlyIncome - totalEssentials;

    res.status(200).json({
      success: true,
      message: "Financial setup completed successfully",

      financialData: {
        monthlyIncome: user.monthlyIncome,
        monthlyEssentials: user.monthlyEssentials,
        totalEssentials,
        availableMoney,
        financialSetupCompleted:
          user.financialSetupCompleted,
      },
    });

  } catch (error) {
    console.log("Financial Setup Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Update financial details from Wallet
const updateFinancialDetails = async (req, res) => {
  try {
    const {
      monthlyIncome,
      rent,
      food,
      bills,
      transport,
      other,
    } = req.body;

    if (
      monthlyIncome === undefined ||
      monthlyIncome === null ||
      monthlyIncome === "" ||
      !Number.isFinite(Number(monthlyIncome)) ||
      Number(monthlyIncome) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid monthly income",
      });
    }

    const values = {
      rent,
      food,
      bills,
      transport,
      other,
    };

    for (const [key, value] of Object.entries(values)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (!Number.isFinite(Number(value)) ||
          Number(value) < 0)
      ) {
        return res.status(400).json({
          success: false,
          message: `Please enter a valid value for ${key}`,
        });
      }
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.monthlyIncome = Number(monthlyIncome);

    user.monthlyEssentials = {
      rent: Number(rent) || 0,
      food: Number(food) || 0,
      bills: Number(bills) || 0,
      transport: Number(transport) || 0,
      other: Number(other) || 0,
    };

    user.financialSetupCompleted = true;

    await user.save();

    // Get updated financial calculations
    const essentials = user.monthlyEssentials;

    const essentialExpenses =
      Number(essentials.rent || 0) +
      Number(essentials.food || 0) +
      Number(essentials.bills || 0) +
      Number(essentials.transport || 0) +
      Number(essentials.other || 0);

    const actualSpending =
      await getCurrentMonthSpending(req.user.id);

    const availableAfterEssentials =
      user.monthlyIncome - essentialExpenses;

    const currentBalance =
      availableAfterEssentials - actualSpending;

    res.status(200).json({
      success: true,
      message: "Financial details updated successfully",

      financialData: {
        income: user.monthlyIncome,

        monthlyEssentials: {
          rent: Number(essentials.rent || 0),
          food: Number(essentials.food || 0),
          bills: Number(essentials.bills || 0),
          transport: Number(essentials.transport || 0),
          other: Number(essentials.other || 0),
        },

        essentialExpenses,

        availableAfterEssentials,

        actualSpending,

        currentBalance,

        financialSetupCompleted:
          user.financialSetupCompleted,
      },
    });

  } catch (error) {
    console.log("Update Financial Details Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


module.exports = {
  saveFinancialSetup,
  getFinancialSummary,
  updateFinancialDetails,
};