import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Food: "#F97316",
  Travel: "#34D399",
  Shopping: "#8B5CF6",
  Bills: "#EF4444",
  Entertainment: "#06B6D4",
  Health: "#EC4899",
  Education: "#EAB308",
  Other: "#64748B",
};

function CategoryChart({ data }) {
  const total = data.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-white text-xl font-bold">
            Category Breakdown
          </h2>
          <p className="text-slate-400 text-sm">
            Where your money is going
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-slate-500 text-center py-10">
          No category data available.
        </p>
      ) : (
        <div className="flex items-center gap-6">

          {/* Left - Donut */}
          <div className="relative w-[150px] h-[150px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={46}
                  outerRadius={68}
                  paddingAngle={2}
                  cornerRadius={8}
                  stroke="#0f172a"
                  strokeWidth={2}
                >
                  {data.map((item, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[item.category] || COLORS.Other}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "Spent",
                  ]}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-lg font-bold text-white">
                ₹{total.toLocaleString("en-IN")}
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                this month
              </p>
            </div>
          </div>

          {/* Right - Categories */}
          <div className="flex-1 space-y-3">
            {data.map((item) => {
              const percentage =
                total > 0
                  ? ((item.amount / total) * 100).toFixed(1)
                  : 0;

              return (
                <div
                  key={item.category}
                  className="flex justify-between items-center bg-slate-800 rounded-xl px-4 py-3 hover:bg-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          COLORS[item.category] || COLORS.Other,
                      }}
                    />
                    <span className="text-slate-300 font-medium">
                      {item.category}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-400 text-xs">
                      {percentage}%
                    </p>
                    <p className="text-white font-semibold">
                      ₹{Number(item.amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}

export default CategoryChart;