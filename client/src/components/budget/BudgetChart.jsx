import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function BudgetChart({ budgets }) {
  const data = budgets.map((budget) => ({
    category: budget.category,
    Budget: budget.limit,
    Spent: budget.spent,
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        Budget vs Spending
      </h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="category"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Budget"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="Spent"
              fill="#8b5cf6"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BudgetChart;