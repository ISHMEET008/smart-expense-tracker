const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

// ================= ADD BUDGET =================

const addBudget = async (req, res) => {
  try {
   const {
  category,
  limit,
  month,
  year,
} = req.body;
   if (!category || !limit) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if budget already exists
    const existingBudget = await Budget.findOne({
      user: req.user.id,
      category,
      month,
      year,
    });

    if (existingBudget) {
      return res.status(400).json({
        success: false,
        message: "Budget already exists for this category and month",
      });
    }

    const budget = await Budget.create({
      user: req.user.id,
      category,
      limit,
      month,
      year,
    });

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      budget,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET BUDGETS =================

const getBudgets = async (req, res) => {
  try {
    const month = Number(req.query.month);
const year = Number(req.query.year);

const filter = {
  user: req.user.id,
};

if (month && year) {
  filter.month = month;
  filter.year = year;
}

const budgets = await Budget.find(filter).sort({
  category: 1,
});

    res.status(200).json({
      success: true,
      budgets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE BUDGET =================

const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    budget.category = req.body.category;
    budget.limit = req.body.limit;
    await budget.save();

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      budget,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE BUDGET =================

const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= BUDGET SUMMARY =================

// ================= BUDGET SUMMARY =================

const getBudgetSummary = async (req, res) => {
  try {
    const now = new Date();

const month = Number(req.query.month);
const year = Number(req.query.year);

const filter = {
  user: req.user.id,
};

if (month && year) {
  filter.month = month;
  filter.year = year;
}

const budgets = await Budget.find(filter);
    const summary = [];

    for (const budget of budgets) {
      const startDate = new Date(
        budget.year,
        budget.month - 1,
        1
      );

      const endDate = new Date(
        budget.year,
        budget.month,
        0,
        23,
        59,
        59
      );

      const expenses = await Expense.find({
        user: req.user.id,
        category: budget.category,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      const spent = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

      const remaining = budget.limit - spent;

      const percentage =
        budget.limit > 0
          ? Number(((spent / budget.limit) * 100).toFixed(1))
          : 0;

      summary.push({
        _id: budget._id,
        category: budget.category,
        limit: budget.limit,
        spent,
        remaining,
        percentage,
        month: budget.month,
        year: budget.year,
      });
    }

    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
  getBudgetSummary,
};