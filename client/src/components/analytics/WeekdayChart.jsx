import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function WeekdayChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[340px] flex items-center justify-center">
        <p className="text-slate-500">No weekday data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-[340px]">
      <h2 className="text-white text-2xl font-bold">
        Spend by Weekday
      </h2>

      <p className="text-slate-400 mt-1 mb-5">
        Weekly spending pattern
      </p>

      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="#334155"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "10px",
            }}
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Spent",
            ]}
          />

          <Bar
            dataKey="amount"
            fill="#22D3EE"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeekdayChart;