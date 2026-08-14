import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { getBudgetSummary } from "../services/budgetService";

function Budget() {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await getBudgetSummary();
      setBudgets(response.data.summary);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Budget" />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-white">
            Budget Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your monthly budgets.
          </p>

          <div className="mt-8 space-y-4">
            {budgets.map((budget) => (
              <div
                key={budget._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold text-white">
                  {budget.category}
                </h2>

                <p className="text-slate-400 mt-2">
                  Budget: ₹{budget.limit}
                </p>

                <p className="text-slate-400">
                  Spent: ₹{budget.spent}
                </p>

                <p className="text-green-400">
                  Remaining: ₹{budget.remaining}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;