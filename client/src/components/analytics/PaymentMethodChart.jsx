import React from "react";

const COLORS = {
  "Credit Card": "bg-violet-500",
  "Debit Card": "bg-cyan-400",
  UPI: "bg-orange-400",
  Cash: "bg-green-500",
  "Net Banking": "bg-pink-500",
  Other: "bg-slate-500",
};

function PaymentMethodChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
   <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl">
      <h2 className="text-white text-xl font-bold">
        Payment Modes
      </h2>

      <p className="text-slate-400 text-sm mb-6">
        Where you usually pay from
      </p>

      {data.length === 0 ? (
        <p className="text-slate-500 text-center py-10">
          No payment data available.
        </p>
      ) : (
        <div className="space-y-5">
          {data.map((item) => {
            const percentage =
              total > 0 ? (item.amount / total) * 100 : 0;

            return (
              <div key={item.method}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 font-medium">
                    {item.method}
                  </span>

                  <span className="text-white font-semibold">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      COLORS[item.method] || COLORS.Other
                    } rounded-full transition-all duration-700`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PaymentMethodChart;