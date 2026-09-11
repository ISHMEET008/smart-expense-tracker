const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authroutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const financialRoutes = require("./routes/financialRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/financial", financialRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Smart Expense Tracker API");
});

module.exports = app;