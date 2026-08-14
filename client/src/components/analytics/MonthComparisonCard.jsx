import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function MonthComparisonCard({
  thisMonth,
  lastMonth,
  percentage,
}) {
  const increased = percentage >= 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">

      <h2 className="text-white text-2xl font-bold">
        Monthly Comparison
      </h2>

      <p className="text-slate-400 mt-1">
        Compare your spending with last month
      </p>

      <div className="flex items-center justify-between mt-8">

        <div>

          <p className="text-slate-400">
            This Month
          </p>

          <h1 className="text-5xl font-bold text-white mt-2">
            ₹{thisMonth.toLocaleString("en-IN")}
          </h1>

        </div>

        <div
          className={`flex items-center gap-3 px-5 py-3 rounded-xl ${
            increased
              ? "bg-red-500/10"
              : "bg-green-500/10"
          }`}
        >

          {increased ? (
            <TrendingUp
              className="text-red-400"
              size={30}
            />
          ) : (
            <TrendingDown
              className="text-green-400"
              size={30}
            />
          )}

          <div>

            <h2
              className={`text-2xl font-bold ${
                increased
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {percentage.toFixed(1)}%
            </h2>

            <p className="text-slate-400 text-sm">
              vs last month
            </p>

          </div>

        </div>

      </div>

      <div className="mt-8 border-t border-slate-800 pt-5">

        <div className="flex justify-between">

          <span className="text-slate-400">
            Last Month
          </span>

          <span className="text-white font-semibold">
            ₹{lastMonth.toLocaleString("en-IN")}
          </span>

        </div>

      </div>

    </div>
  );
}

export default MonthComparisonCard;