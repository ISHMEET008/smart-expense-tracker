const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");
// ================= ADD EXPENSE =================

const addExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      category,
      paymentMethod,
      note,
      date,
    } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
      note,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Expense Added Successfully",
      expense,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET EXPENSES =================

const getExpenses = async (req, res) => {
  try {
    
    // console.log("Query:", req.query);

const now = new Date();

const today = new Date();

const month = req.query.month
  ? Number(req.query.month)
  : today.getMonth() + 1;

const year = req.query.year
  ? Number(req.query.year)
  : today.getFullYear();

// console.log(month, year);

const startDate = new Date(year, month - 1, 1);

const endDate = new Date(
  year,
  month,
  0,
  23,
  59,
  59,
  999
);

const expenses = await Expense.find({
  user: req.user.id,
  date: {
    $gte: startDate,
    $lte: endDate,
  },
});

    res.status(200).json({
      success: true,
      expenses,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE EXPENSE =================

const updateExpense = async (req, res) => {
  try {

    const expenseId = req.params.id;

    const {
      title,
      amount,
      category,
      paymentMethod,
      note,
      date,
    } = req.body;

    // Find expense belonging to logged-in user
    const expense = await Expense.findOne({
      _id: expenseId,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    // Update fields
    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.paymentMethod = paymentMethod;
    expense.note = note;
    expense.date = date;

    await expense.save();

    res.status(200).json({
      success: true,
      message: "Expense Updated Successfully",
      expense,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE EXPENSE =================

const deleteExpense = async (req, res) => {
  try {

    const expenseId = req.params.id;

    // Only delete expense belonging to logged-in user
    const expense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense Deleted Successfully",
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= FINANCIAL SUMMARY =================

const getFinancialSummary = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

   const today = new Date();

const month = req.query.month
  ? Number(req.query.month)
  : today.getMonth() + 1;

const year = req.query.year
  ? Number(req.query.year)
  : today.getFullYear();

  if (isNaN(month) || isNaN(year)) {
  return res.status(400).json({
    success: false,
    message: "Invalid month/year",
  });
}

const startDate = new Date(year, month - 1, 1);

const endDate = new Date(
  year,
  month,
  0,
  23,
  59,
  59,
  999
);

const expenses = await Expense.find({
  user: req.user.id,
  date: {
    $gte: startDate,
    $lte: endDate,
  },
});

    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const income = user.income || 0;

const currentBalance =
  income > 0
    ? income - totalExpenses
    : null;

    res.status(200).json({
      success: true,
      income: user.income,
      totalExpenses,
      currentBalance,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= REPORT =================

const getExpenseReport = async (req, res) => {
  try {
    const { period } = req.query;

    let startDate = new Date();
    const endDate = new Date();

    switch (period) {
      case "weekly":
        startDate.setDate(endDate.getDate() - 7);
        break;

      case "monthly":
        startDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          1
        );
        break;

      case "yearly":
        startDate = new Date(
          endDate.getFullYear(),
          0,
          1
        );
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid period",
        });
    }

    const expenses = await Expense.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const transactionCount = expenses.length;

    const highestExpense =
      expenses.length > 0
        ? Math.max(...expenses.map((e) => e.amount))
        : 0;

    const categoryTotals = {};

    const startOfWeek = new Date();
startOfWeek.setDate(
  startOfWeek.getDate() - startOfWeek.getDay()
);

expenses
  .filter(
    (expense) => new Date(expense.date) >= startOfWeek
  )
  .forEach((expense) => {
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
      }

      categoryTotals[expense.category] += expense.amount;
    });

    res.status(200).json({
      success: true,
      period,
      totalExpenses,
      transactionCount,
      highestExpense,
      categoryTotals,
    });

  } catch (error) {
    // console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EXPORTS =================


// ================= ANALYTICS =================

// ================= ANALYTICS =================

const getAnalytics = async (req, res) => {
  try {

    const today = new Date();

    const month = req.query.month
      ? Number(req.query.month)
      : today.getMonth() + 1;

    const year = req.query.year
      ? Number(req.query.year)
      : today.getFullYear();

    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(
      year,
      month,
      0,
      23,
      59,
      59,
      999
    );

    const expenses = await Expense.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    }).sort({ date: 1 });

    // ================= TOTALS =================

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const highestExpense =
      expenses.length > 0
        ? Math.max(...expenses.map(e => Number(e.amount)))
        : 0;

    const averageExpense =
      expenses.length > 0
        ? totalExpenses / expenses.length
        : 0;

    const daysPassed =
      month === today.getMonth() + 1 &&
      year === today.getFullYear()
        ? today.getDate()
        : new Date(year, month, 0).getDate();

    const averageDailySpend =
      totalExpenses / Math.max(daysPassed, 1);

    // ================= PAYMENT METHODS =================

    const paymentTotals = {};

    expenses.forEach((expense) => {

      const method = expense.paymentMethod || "Other";

      paymentTotals[method] =
        (paymentTotals[method] || 0) +
        Number(expense.amount);

    });

    const paymentMethods = Object.keys(paymentTotals)
      .map(method => ({
        method,
        amount: paymentTotals[method],
      }))
      .sort((a, b) => b.amount - a.amount);

    // ================= CATEGORY =================

    const categoryTotals = {};

    expenses.forEach((expense) => {

      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(expense.amount);

    });

    const topCategories = Object.keys(categoryTotals)
      .map(category => ({
        category,
        amount: categoryTotals[category],
      }))
      .sort((a, b) => b.amount - a.amount);

    // ================= MONTHLY TREND =================

       // ================= MONTHLY TREND =================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyTrend = [];

    for (let i = 5; i >= 0; i--) {

      const current = new Date(year, month - 1 - i, 1);

      const trendStart = new Date(
        current.getFullYear(),
        current.getMonth(),
        1
      );

      const trendEnd = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      const trendExpenses = await Expense.find({
        user: req.user.id,
        date: {
          $gte: trendStart,
          $lte: trendEnd,
        },
      });

      const total = trendExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

      monthlyTrend.push({
        month: monthNames[current.getMonth()],
        amount: total,
      });

    }

    // ================= WEEKDAY SPENDING =================

    const weekdayNames = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const weekdayTotals = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    expenses.forEach((expense) => {

      const day =
        weekdayNames[new Date(expense.date).getDay()];

      weekdayTotals[day] += Number(expense.amount);

    });

    const weekdaySpend = weekdayNames.map((day) => ({
      day,
      amount: weekdayTotals[day],
    }));

    // ================= MONTH COMPARISON =================

    const previousMonthStart = new Date(
      year,
      month - 2,
      1
    );

    const previousMonthEnd = new Date(
      year,
      month - 1,
      0,
      23,
      59,
      59,
      999
    );

    const previousExpenses = await Expense.find({
      user: req.user.id,
      date: {
        $gte: previousMonthStart,
        $lte: previousMonthEnd,
      },
    });

    const thisMonthTotal = totalExpenses;

    const lastMonthTotal = previousExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const percentageChange =
      lastMonthTotal === 0
        ? 100
        : (
            ((thisMonthTotal - lastMonthTotal) /
              lastMonthTotal) *
            100
          ).toFixed(1);

    // ================= SMART INSIGHTS =================

       // ================= SMART INSIGHTS =================

    const insights = [];

    if (topCategories.length > 0) {
      insights.push(
        `You spend the most on ${topCategories[0].category}.`
      );
    }

    if (paymentMethods.length > 0) {
      insights.push(
        `${paymentMethods[0].method} is your most used payment method.`
      );
    }

    const highestDay = [...weekdaySpend].sort(
      (a, b) => b.amount - a.amount
    )[0];

    if (highestDay && highestDay.amount > 0) {
      insights.push(
        `${highestDay.day} is your highest spending day.`
      );
    }

    if (percentageChange > 0) {
      insights.push(
        `Your spending increased by ${percentageChange}% compared to last month.`
      );
    } else if (percentageChange < 0) {
      insights.push(
        `Great! Your spending decreased by ${Math.abs(
          percentageChange
        )}% compared to last month.`
      );
    }

    // ================= RESPONSE =================

    res.status(200).json({
      success: true,

      expenses,

      totalExpenses,

      highestExpense,

      averageExpense,

      averageDailySpend,

      paymentMethods,

      topCategories,

      monthlyTrend,

      weekdaySpend,

      thisMonthTotal,

      lastMonthTotal,

      percentageChange: Number(percentageChange),

      insights,
    });

  } catch (error) {

    console.error("Analytics Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getFinancialSummary,
  getExpenseReport,
  getAnalytics,
};