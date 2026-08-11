import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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

  // ================= FETCH DATA =================

  const fetchData = async () => {
    try {
      const expenseResponse = await getExpenses();
      const summaryResponse = await getFinancialSummary();

      setExpenses(expenseResponse.data.expenses);
      setSummary(summaryResponse.data);

    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteExpense(id);

      toast.success("Expense deleted successfully 🗑️");

      // Refresh expenses + balance
      await fetchData();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete expense"
      );
    }
  };

  // ================= EDIT =================

  const handleEdit = (expense) => {
    setEditingExpense(expense);
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

            {/* Add Expense */}

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


          {/* ================= EXPENSES ================= */}

          <div className="mt-8">

            <h3 className="text-white text-2xl font-semibold mb-4">
              Your Expenses
            </h3>


            {expenses.length === 0 ? (

              <p className="text-slate-400">
                No expenses yet.
              </p>

            ) : (

              <div className="space-y-3">

                {expenses.map((expense) => (

                  <div
                    key={expense._id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                  >

                    {/* Expense Information */}

                    <div>

                      <h4 className="text-white font-semibold">
                        {expense.title}
                      </h4>

                      <p className="text-slate-400 text-sm">
                        {expense.category} • {expense.paymentMethod}
                      </p>

                      {expense.date && (
                        <p className="text-slate-500 text-xs mt-1">
                          {new Date(expense.date).toLocaleDateString("en-IN")}
                        </p>
                      )}

                    </div>


                    {/* Amount + Actions */}

                    <div className="flex items-center gap-4">

                      <p className="text-red-400 font-semibold">
                        ₹{Number(expense.amount).toLocaleString("en-IN")}
                      </p>


                      {/* Edit */}

                      <button
                        onClick={() => handleEdit(expense)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 transition"
                        title="Edit expense"
                      >
                        <Pencil
                          size={17}
                          className="text-white"
                        />
                      </button>


                      {/* Delete */}

                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-600 transition"
                        title="Delete expense"
                      >
                        <Trash2
                          size={17}
                          className="text-white"
                        />
                      </button>

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