function BudgetCard({
  budget,
  onEdit,
  onDelete,
}) {
  const spent = budget.spent || 0;
  const limit = budget.limit || 0;

  const percentage =
  limit > 0
    ? (spent / limit) * 100
    : 0;

 const remaining = limit - spent;

let color = "bg-green-500";
let status = "On Track";
let badgeColor = "bg-green-500";

if (percentage >= 100) {
  color = "bg-red-500";
  status = "Over Budget";
  badgeColor = "bg-red-500";
} else if (percentage >= 80) {
  color = "bg-yellow-500";
  status = "Warning";
  badgeColor = "bg-yellow-500";
}

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition-all">

      {/* Header */}

<div className="flex justify-between items-start">

  <div>

    <h2 className="text-2xl font-bold text-white">
      {budget.category}
    </h2>

    <p className="text-slate-400 text-sm mt-1">
      Budget Limit
    </p>

  </div>

  <div className="text-right">

    <h3 className="text-cyan-400 text-2xl font-bold">
      ₹{limit.toLocaleString("en-IN")}
    </h3>

    <span
      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
        percentage >= 100
          ? "bg-red-500/20 text-red-400"
          : percentage >= 80
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-green-500/20 text-green-400"
      }`}
    >
      {percentage >= 100
        ? "Exceeded"
        : percentage >= 80
        ? "Near Limit"
        : "On Track"}
    </span>

  </div>

</div>

      {/* Progress */}

     <div className="mt-6">

  <div className="flex justify-between text-sm mb-2">

    <span className="text-slate-400">
      Budget Usage
    </span>

    <span className="text-white font-semibold">
      {percentage.toFixed(1)}%
    </span>

  </div>

  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">

    <div
      className={`h-full rounded-full transition-all duration-500 ${color}`}
      style={{
  width: `${Math.min(percentage, 100)}%`,
}}
    />

  </div>

</div>

<div className="mt-5 flex justify-between items-center">

  <p className="text-slate-400 text-sm">
    Budget Period
  </p>

  <span className="text-cyan-400 font-medium">
    {new Date(budget.year, budget.month - 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}
  </span>

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


      {/* Budget Alert */}

{percentage >= 100 ? (
  <div className="mt-5 rounded-xl bg-red-900/30 border border-red-500 p-3">
    <p className="text-red-400 font-medium">
      🚨 Budget exceeded by ₹
      {Math.abs(remaining).toLocaleString("en-IN")}
    </p>
  </div>
) : percentage >= 80 ? (
  <div className="mt-5 rounded-xl bg-yellow-900/30 border border-yellow-500 p-3">
    <p className="text-yellow-300 font-medium">
      ⚠️ Only ₹
      {remaining.toLocaleString("en-IN")} remaining.
    </p>
  </div>
) : (
  <div className="mt-5 rounded-xl bg-green-900/20 border border-green-500 p-3">
    <p className="text-green-400 font-medium">
      ✅ You're within your budget.
    </p>
  </div>
)}

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(budget)}
          className="flex-1 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(budget._id)}
          className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition"
        >
         🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default BudgetCard;