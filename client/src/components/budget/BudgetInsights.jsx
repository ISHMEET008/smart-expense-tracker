function BudgetInsights({ budgets }) {
  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white">
        💡 Budget Insights
      </h2>

      <p className="text-slate-400 mt-2">
        Smart insights based on your current budgets and spending.
      </p>

      <div className="mt-6 space-y-4">

        {budgets.map((budget) => {
          const spent = budget.spent || 0;
          const limit = budget.limit || 0;
          const remaining = limit - spent;

          const percentage =
            limit > 0 ? (spent / limit) * 100 : 0;

          // Over Budget
          if (spent > limit) {
            return (
              <div
                key={budget._id}
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
              >
                <p className="text-red-300 font-semibold">
                  🚨 <b>{budget.category}</b> exceeded its budget by ₹
                  {Math.abs(remaining).toLocaleString("en-IN")}
                </p>
              </div>
            );
          }

          // Near Limit
          if (remaining > 0 && remaining <= limit * 0.2) {
            return (
              <div
                key={budget._id}
                className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
              >
                <p className="text-yellow-300 font-semibold">
                  ⚠️ <b>{budget.category}</b> has only ₹
                  {remaining.toLocaleString("en-IN")} remaining.
                </p>
              </div>
            );
          }

          // On Track
          return (
            <div
              key={budget._id}
              className="rounded-xl border border-green-500/30 bg-green-500/10 p-4"
            >
              <p className="text-green-300 font-semibold">
                ✅ <b>{budget.category}</b> is on track.
              </p>
            </div>
          );
        })}

        {/* Empty State */}

        {budgets.length === 0 && (
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-center">
            <p className="text-slate-400">
              No budget insights available yet.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default BudgetInsights;