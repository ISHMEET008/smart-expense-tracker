function BudgetSummary({ budgets }) {
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + (budget.limit || 0),
    0
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + (budget.spent || 0),
    0
  );

  const remaining = totalBudget - totalSpent;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Total Budget */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Total Budget
        </p>

        <h2 className="text-3xl font-bold text-cyan-400 mt-2">
          ₹{totalBudget.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Total Spent */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Total Spent
        </p>

        <h2 className="text-3xl font-bold text-red-400 mt-2">
          ₹{totalSpent.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Remaining */}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Remaining Budget
        </p>

        <h2
          className={`text-3xl font-bold mt-2 ${
            remaining >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          ₹{remaining.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>
  );
}

export default BudgetSummary;