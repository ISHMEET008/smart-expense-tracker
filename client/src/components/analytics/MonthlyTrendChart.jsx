import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyTrendChart({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-white text-xl font-bold">
        Monthly Spending Trend
      </h2>

      <p className="text-slate-400 text-sm mt-1 mb-6">
        Track how your expenses change over time
      </p>

      {data.length === 0 ? (
        <p className="text-slate-500 text-center py-20">
          No trend data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              vertical={true}
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#94A3B8"
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Spent",
              ]}
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#22D3EE"
              strokeWidth={3}
              fill="url(#expenseFill)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "#22D3EE",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              isAnimationActive
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MonthlyTrendChart;