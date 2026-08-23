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

    if (spent > limit) {
  return (
    <div
      key={budget._id}
      className="rounded-xl border border-red-500/30 bg-red-500/10 p-4"
    >
      <p className="text-red-400 font-medium">
        🚨 <b>{budget.category}</b> exceeded its budget by ₹
        {Math.abs(remaining).toLocaleString("en-IN")}
      </p>
    </div>
  );
}

// Near Limit (less than 20% remaining)
if (remaining > 0 && remaining <= limit * 0.2) {
  return (
    <div
      key={budget._id}
      className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
    >
      <p className="text-yellow-300 font-medium">
        ⚠ <b>{budget.category}</b> has only ₹
        {remaining.toLocaleString("en-IN")} remaining.
      </p>
    </div>
  );
}

return null;

  })}

</div>

    </div>
  );
}

export default BudgetInsights;