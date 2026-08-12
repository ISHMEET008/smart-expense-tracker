import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  CreditCard,
  Wallet,
  Smartphone,
  Landmark,
} from "lucide-react";
import { getExpenseReport } from "../services/expenseService";
import ReportSummary from "../components/dashboard/ReportSummary";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import AddExpense from "../components/dashboard/AddExpense";
import StatsCards from "../components/dashboard/StatsCards";

import {
  getExpenses,
  getFinancialSummary,
  deleteExpense,
} from "../services/expenseService";

import toast from "react-hot-toast";

function Dashboard() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [summary, setSummary] = useState({
    income: 0,
    totalExpenses: 0,
    currentBalance: 0,
  });

  const [period, setPeriod] = useState("monthly");

  const [report, setReport] = useState({
    transactionCount: 0,
    highestExpense: 0,
    totalExpenses: 0,
  });

  // ================= FETCH DATA =================

  const fetchData = async () => {
    try {
      const expenseResponse = await getExpenses();
      const summaryResponse = await getFinancialSummary();
      const reportResponse = await getExpenseReport(period);

      setExpenses(expenseResponse.data.expenses);
      setSummary(summaryResponse.data);
      setReport(reportResponse.data);
    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  // ================= ADD / EDIT =================

  const handleExpenseAdded = async () => {
    await fetchData();
    setShowAddExpense(false);
    setEditingExpense(null);
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await deleteExpense(id);

      toast.success("Expense deleted successfully 🗑️");

      await fetchData();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to delete expense"
      );
    }
  };

  // ================= EDIT =================

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const categoryColors = {
  Food: "bg-orange-500/20 text-orange-400",
  Travel: "bg-blue-500/20 text-blue-400",
  Shopping: "bg-pink-500/20 text-pink-400",
  Bills: "bg-yellow-500/20 text-yellow-400",
  Entertainment: "bg-violet-500/20 text-violet-400",
  Health: "bg-red-500/20 text-red-400",
  Education: "bg-green-500/20 text-green-400",
  Other: "bg-slate-600/20 text-slate-300",
};

const getPaymentIcon = (method) => {
  switch (method) {
    case "UPI":
      return <Smartphone size={16} />;
    case "Cash":
      return <Wallet size={16} />;
    case "Credit Card":
      return <CreditCard size={16} />;
    case "Debit Card":
      return <CreditCard size={16} />;
    case "Net Banking":
      return <Landmark size={16} />;
    default:
      return <Wallet size={16} />;
  }
};

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          {/* ================= HEADER ================= */}

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-4xl font-bold">
                Good Evening 👋
              </h2>

              <p className="text-slate-400 mt-2">
                Let's track your expenses and grow your savings.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingExpense(null);
                setShowAddExpense(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Add Expense
            </button>
          </div>

          {/* ================= STATS ================= */}

          <StatsCards summary={summary} />

          {/* ================= REPORT FILTER ================= */}

          <div className="flex gap-3 mt-8">
            {["weekly", "monthly", "yearly"].map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`px-5 py-2 rounded-xl font-medium transition duration-300 ${
                  period === item
                    ? "bg-purple-600 text-white"
                    : "bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <ReportSummary report={report} />

          {/* ================= EXPENSES ================= */}

          <div className="mt-8">
            <h3 className="text-white text-2xl font-semibold mb-4">
              Your Expenses
            </h3>

            {expenses.length === 0 ? (
              <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4">📂</div>

                <h3 className="text-white text-2xl font-bold">
                  No expenses yet
                </h3>

                <p className="text-slate-400 mt-3 max-w-md">
                  Start tracking your spending by adding your first expense.
                  Your balance, reports and analytics will update automatically.
                </p>

                <button
                  onClick={() => {
                    setEditingExpense(null);
                    setShowAddExpense(true);
                  }}
                  className="mt-6 bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 rounded-xl text-white font-semibold hover:scale-105 transition duration-300"
                >
                  + Add Your First Expense
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {expenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${categoryColors[expense.category] || categoryColors.Other}`}>
                        {expense.category === "Food" && "🍔"}
                        {expense.category === "Travel" && "✈️"}
                        {expense.category === "Shopping" && "🛍️"}
                        {expense.category === "Bills" && "📄"}
                        {expense.category === "Entertainment" && "🎬"}
                        {expense.category === "Health" && "🏥"}
                        {expense.category === "Education" && "📚"}
                        {expense.category === "Other" && "📦"}
                      </div>

                      <div>
                        <h4 className="text-white text-lg font-semibold">{expense.title}</h4>

                        <div className="flex items-center gap-3 mt-2 flex-wrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[expense.category] || categoryColors.Other}`}>
                            {expense.category}
                          </span>

                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            {getPaymentIcon(expense.paymentMethod)}
                            <span>{expense.paymentMethod}</span>
                          </div>
                        </div>

                        {expense.note && (
                          <p className="text-slate-400 text-sm italic mt-2">
                            "{expense.note}"
                          </p>
                        )}

                        {expense.date && (
                          <p className="text-slate-500 text-xs mt-2">
                            📅 {new Date(expense.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <h3 className="text-red-400 text-2xl font-bold">
                        - ₹{Number(expense.amount).toLocaleString("en-IN")}
                      </h3>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-purple-600 transition-all duration-300 hover:scale-110"
                        >
                          <Pencil size={18} className="text-white" />
                        </button>

                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 transition-all duration-300 hover:scale-110"
                        >
                          <Trash2 size={18} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= ADD EXPENSE MODAL ================= */}

      {showAddExpense && (
        <AddExpense
          onClose={() => setShowAddExpense(false)}
          onExpenseAdded={handleExpenseAdded}
        />
      )}

      {/* ================= EDIT EXPENSE MODAL ================= */}

      {editingExpense && (
        <AddExpense
          editingExpense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onExpenseAdded={handleExpenseAdded}
        />
      )}
    </div>
  );
}

export default Dashboard;