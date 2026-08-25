const Expense = require("../models/Expense");
const User = require("../models/User");

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
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET EXPENSES =================

const getExpenses = async (req, res) => {
  try {

    const month = Number(req.query.month);
const year = Number(req.query.year);

const startDate = new Date(year, month - 1, 1);

const endDate = new Date(
  year,
  month,
  0,
  23,
  59,
  59
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
    console.error(error);

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
    console.error(error);

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
    console.error(error);

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

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const totalExpenses = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    const currentBalance = user.income - totalExpenses;

    res.status(200).json({
      success: true,
      income: user.income,
      totalExpenses,
      currentBalance,
    });

  } catch (error) {
    console.error(error);

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
    console.error(error);

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
    const month = Number(req.query.month);
const year = Number(req.query.year);

const startDate = new Date(
  year,
  month - 1,
  1
);

const endDate = new Date(
  year,
  month,
  0,
  23,
  59,
  59
);

const expenses = await Expense.find({
  user: req.user.id,
  date: {
    $gte: startDate,
    $lte: endDate,
  },
});

    // ================= TOTALS =================

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    const highestExpense =
      expenses.length > 0
        ? Math.max(...expenses.map((e) => Number(e.amount)))
        : 0;

    const averageExpense =
      expenses.length > 0
        ? totalExpenses / expenses.length
        : 0;

  const today = new Date();

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
        (paymentTotals[method] || 0) + Number(expense.amount);
    });

    const paymentMethods = Object.keys(paymentTotals)
      .map((method) => ({
        method,
        amount: paymentTotals[method],
      }))
      .sort((a, b) => b.amount - a.amount);

    // ================= CATEGORY =================

    const categoryTotals = {};

    expenses.forEach((expense) => {
      const category = expense.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(expense.amount);
    });

    const topCategories = Object.keys(categoryTotals)
      .map((category) => ({
        category,
        amount: categoryTotals[category],
      }))
      .sort((a, b) => b.amount - a.amount);

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
  const date = new Date(year, month - 1 - i, 1);

  const monthName = monthNames[date.getMonth()];
  const trendYear = date.getFullYear();

  const amount = await Expense.aggregate([
    {
      $match: {
        user: req.user.id,
        date: {
          $gte: new Date(
            trendYear,
            date.getMonth(),
            1
          ),
          $lte: new Date(
            trendYear,
            date.getMonth() + 1,
            0,
            23,
            59,
            59
          ),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

  monthlyTrend.push({
    month: monthName,
    amount: amount.length ? amount[0].total : 0,
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
      const day = weekdayNames[new Date(expense.date).getDay()];

      weekdayTotals[day] += Number(expense.amount);
    });

    const weekdaySpend = weekdayNames.map((day) => ({
      day,
      amount: weekdayTotals[day],
    }));

    // ================= MONTH COMPARISON =================

   const currentMonth = month - 1;
const currentYear = year;

const lastMonth =
  currentMonth === 0
    ? 11
    : currentMonth - 1;

const lastMonthYear =
  currentMonth === 0
    ? currentYear - 1
    : currentYear;

   const previousMonthStart = new Date(
  lastMonthYear,
  lastMonth,
  1
);

const previousMonthEnd = new Date(
  lastMonthYear,
  lastMonth + 1,
  0,
  23,
  59,
  59
);

const previousMonthExpenses = await Expense.find({
  user: req.user.id,
  date: {
    $gte: previousMonthStart,
    $lte: previousMonthEnd,
  },
});

const thisMonthTotal = totalExpenses;

const lastMonthTotal = previousMonthExpenses.reduce(
  (sum, expense) => sum + Number(expense.amount),
  0
);

    const percentageChange =
      lastMonthTotal === 0
        ? 100
        : ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

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

    // ================= RESPONSE =================

    res.status(200).json({
  success: true,

  totalExpenses,
  highestExpense,
  averageExpense,
  averageDailySpend,
  expenses,

  paymentMethods,
  topCategories,
  monthlyTrend,
  weekdaySpend,

  thisMonthTotal,
  lastMonthTotal,
  percentageChange,

  insights,
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
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getFinancialSummary,
  getExpenseReport,
  getAnalytics,
};