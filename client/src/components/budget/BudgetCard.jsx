import {
  FaUtensils,
  FaShoppingBag,
  FaPlane,
  FaBolt,
  FaFilm,
  FaHeartbeat,
  FaBook,
  FaWallet,
} from "react-icons/fa";

function BudgetCard({
  budget,
  onEdit,
  onDelete,
}) {
  const categoryIcons = {
  Food: <FaUtensils />,
  Shopping: <FaShoppingBag />,
  Travel: <FaPlane />,
  Bills: <FaBolt />,
  Entertainment: <FaFilm />,
  Health: <FaHeartbeat />,
  Education: <FaBook />,
  Other: <FaWallet />,
};
  const spent = budget.spent || 0;
  const limit = budget.limit || 0;

  const percentage =
  limit > 0
    ? (spent / limit) * 100
    : 0;

 const remaining = limit - spent;

 const today = new Date();

const budgetEndDate = new Date(
  budget.year,
  budget.month,
  0
);

const daysLeft = Math.ceil(
  (budgetEndDate - today) / (1000 * 60 * 60 * 24)
);
const daysPassed = today.getDate();

const daysInMonth = new Date(
  budget.year,
  budget.month,
  0
).getDate();

const projectedSpend =
  (spent / Math.max(daysPassed, 1)) * daysInMonth;

const projectedOver =
  Math.max(projectedSpend - limit, 0);
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

    <div className="flex items-center gap-3">

  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-lg">
    {categoryIcons[budget.category] || <FaWallet />}
  </div>

  <div>

    <h2 className="text-2xl font-bold text-white">
      {budget.category}
    </h2>

    <p className="text-slate-400 text-sm mt-1">
      Budget Limit
      
    </p>

  </div>

</div>

   

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
  ? "🚨 Over Budget"
  : percentage >= 80
  ? `₹${remaining.toLocaleString("en-IN")} Left`
  : "✅ On Track"}
</span>
  </div>

</div>

      {/* Progress */}

     <div className="mt-6">

  <div className="flex justify-between items-center mb-2">

    <p className="text-slate-400 text-sm">
      Spent So Far
    </p>

    <p className="text-cyan-400 font-semibold">
      {percentage.toFixed(0)}%
    </p>

  </div>

  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

    <div
      className={`h-full rounded-full transition-all duration-700 ${color}`}
      style={{
        width: `${percentage}%`,
      }}
    />

  </div>

</div>


<div className="mt-3 flex items-center gap-2 text-sm">

  <span className="text-lg">🕒</span>

  <span
    className={`font-medium ${
      daysLeft > 10
        ? "text-green-400"
        : daysLeft > 5
        ? "text-yellow-400"
        : "text-red-400"
    }`}
  >
    {daysLeft > 0
      ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left in ${
          new Date(
            budget.year,
            budget.month - 1
          ).toLocaleString("default", {
            month: "long",
          })
        }`
      : "Budget period ended"}
  </span>

</div>

      {/* Stats */}

    <div className="grid grid-cols-2 gap-6 mt-5">

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
  {remaining >= 0 ? "Remaining" : "Over Budget"}
</p>

          <p
  className={`font-semibold ${
    remaining >= 0
      ? "text-green-400"
      : "text-red-400"
  }`}
>
  {remaining >= 0
  ? `₹${remaining.toLocaleString("en-IN")}`
  : `₹${Math.abs(remaining).toLocaleString("en-IN")}`}
</p>

        </div>

       

      </div>


      {/* Budget Alert */}

{percentage >= 100 ? (
 <div className="mt-5 rounded-xl bg-red-500/10 border border-red-400/40 p-4">
    <p className="flex items-center gap-2 text-red-300 font-semibold">
      🚨 Budget exceeded by ₹
      
      {Math.abs(remaining).toLocaleString("en-IN")}
    </p>
  </div>
) : percentage >= 80 ? (
  <div className="mt-5 rounded-xl bg-yellow-900/30 border border-yellow-500 p-3">
    <p className="text-yellow-300 font-medium">
      ⚠️ Only ₹{remaining.toLocaleString("en-IN")} remaining.

<p className="text-yellow-200 text-sm mt-2">
Try limiting spending for the remaining {daysLeft} day{daysLeft !== 1 ? "s" : ""}.
</p>
    </p>
  </div>
) : (
  <div className="mt-5 rounded-xl bg-green-900/20 border border-green-500 p-3">

  <p className="text-green-400 font-semibold">
    ✅ Great job!
  </p>

  <p className="text-slate-300 text-sm mt-1">
    You're managing this budget well.
    {percentage <= 20
      ? " Spending is still very low."
      : " Keep spending at this pace."}
  </p>

</div>
)}

      {/* Buttons */}

     <div className="flex justify-between items-center mt-6">

        <button
          onClick={() => onEdit(budget)}
          className="px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(budget._id)}
          className="px-4 py-2 rounded-xl border border-red-500 text-red-400 hover:bg-red-500/10 transition"
        >
         🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default BudgetCard;