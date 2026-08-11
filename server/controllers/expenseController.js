const Expense = require("../models/Expense");

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

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

module.exports = {
  addExpense,
  getExpenses,
};