function StatsCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      {/* Current Balance */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Current Balance
        </p>

        <h3 className="text-white text-3xl font-bold mt-2">
          ₹{summary.currentBalance.toLocaleString("en-IN")}
        </h3>
      </div>

      {/* Income */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Income
        </p>

        <h3 className="text-green-400 text-3xl font-bold mt-2">
          ₹{summary.income.toLocaleString("en-IN")}
        </h3>
      </div>

      {/* Total Expenses */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">
          Total Expenses
        </p>

        <h3 className="text-red-400 text-3xl font-bold mt-2">
          ₹{summary.totalExpenses.toLocaleString("en-IN")}
        </h3>
      </div>

    </div>
  );
}

export default StatsCards;