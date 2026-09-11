const User = require("../models/User");

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

    // Basic validation
    if (monthlyIncome === undefined || monthlyIncome < 0) {
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

    // Calculate total essentials
    const totalEssentials =
      user.monthlyEssentials.rent +
      user.monthlyEssentials.food +
      user.monthlyEssentials.bills +
      user.monthlyEssentials.transport +
      user.monthlyEssentials.other;

    const availableMoney = user.monthlyIncome - totalEssentials;

    res.status(200).json({
      success: true,
      message: "Financial setup completed successfully",
      financialData: {
        monthlyIncome: user.monthlyIncome,
        monthlyEssentials: user.monthlyEssentials,
        totalEssentials,
        availableMoney,
        financialSetupCompleted: user.financialSetupCompleted,
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

module.exports = {
  saveFinancialSetup,
};