const Income = require("../models/Income");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// ================= REGISTER =================

// ================= REGISTER =================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create token for the newly registered user
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        financialSetupCompleted: user.financialSetupCompleted,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= LOGIN =================

// ================= LOGIN =================

const loginUser = async (req, res) => {
  try {
    console.log("LOGIN REQUEST RECEIVED");
    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Login Success");
    console.log("User ID:", user._id);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        financialSetupCompleted: user.financialSetupCompleted,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE INCOME =================

const updateIncome = async (req, res) => {
  try {
    const { amount } = req.body;

    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid income",
      });
    }

    const income = await Income.findOneAndUpdate(
      {
        user: req.user.id,
        month,
        year,
      },
      {
        amount,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Income saved successfully",
      income,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET CURRENT MONTH INCOME =================

const getIncome = async (req, res) => {
  try {
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const income = await Income.findOne({
      user: req.user.id,
      month,
      year,
    });

    res.status(200).json({
      success: true,
      income: income ? income.amount : null,
      month,
      year,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EXPORTS =================

module.exports = {
  registerUser,
  loginUser,
  updateIncome,
   getIncome,
};