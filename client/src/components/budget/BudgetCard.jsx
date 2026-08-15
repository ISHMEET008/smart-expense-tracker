function BudgetCard({
  budget,
  onEdit,
  onDelete,
}) {
  const spent = budget.spent || 0;
  const limit = budget.limit || 0;

  const percentage =
    limit > 0
      ? Math.min((spent / limit) * 100, 100)
      : 0;

  const remaining = limit - spent;

  let color = "bg-green-500";

  if (percentage >= 90) {
    color = "bg-red-500";
  } else if (percentage >= 70) {
    color = "bg-yellow-500";
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition-all">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold text-white">
          {budget.category}
        </h2>

        <span className="text-cyan-400 font-bold">
          ₹{limit.toLocaleString("en-IN")}
        </span>

      </div>

      {/* Progress */}

      <div className="mt-5">

        <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

          <div
            className={`h-full rounded-full ${color}`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

      {/* Stats */}

      <div className="flex justify-between mt-5">

        <div>

          <p className="text-slate-400 text-sm">
            Spent
          </p>

          <p className="text-white font-semibold">
            ₹{spent.toLocaleString("en-IN")}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Remaining
          </p>

          <p
            className={`font-semibold ${
              remaining >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ₹{remaining.toLocaleString("en-IN")}
          </p>

        </div>

        <div>

          <p className="text-slate-400 text-sm">
            Used
          </p>

          <p className="text-cyan-400 font-semibold">
            {percentage.toFixed(0)}%
          </p>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(budget)}
          className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(budget._id)}
          className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default BudgetCard;