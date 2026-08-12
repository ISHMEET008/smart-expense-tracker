function ReportSummary({ report }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">Transactions</p>

        <h2 className="text-white text-3xl font-bold mt-2">
          {report.transactionCount}
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">Highest Expense</p>

        <h2 className="text-red-400 text-3xl font-bold mt-2">
          ₹{report.highestExpense.toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400">Report Total</p>

        <h2 className="text-cyan-400 text-3xl font-bold mt-2">
          ₹{report.totalExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

    </div>
  );
}

export default ReportSummary;