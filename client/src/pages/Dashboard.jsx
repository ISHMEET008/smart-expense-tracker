import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import AddExpense from "../components/dashboard/AddExpense";
import { getExpenses } from "../services/expenseService";

function Dashboard() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses();

        setExpenses(response.data.expenses);
      } catch (error) {
        console.log("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses((prevExpenses) => [
      newExpense,
      ...prevExpenses,
    ]);
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-white text-4xl font-bold">
                Good Evening 👋
              </h2>

              <p className="text-slate-400 mt-2">
                Let's track your expenses and grow your savings.
              </p>
            </div>

            {/* Add Expense Button */}
            <button
              onClick={() => setShowAddExpense(true)}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              + Add Expense
            </button>

          </div>

          {/* Temporary Expense List */}
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

                    <div>
                      <h4 className="text-white font-semibold">
                        {expense.title}
                      </h4>

                      <p className="text-slate-400 text-sm">
                        {expense.category} • {expense.paymentMethod}
                      </p>
                    </div>

                    <p className="text-red-400 font-semibold">
                      ₹{expense.amount}
                    </p>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <AddExpense
          onClose={() => setShowAddExpense(false)}
          onExpenseAdded={handleExpenseAdded}
        />
      )}

    </div>
  );
}

export default Dashboard;