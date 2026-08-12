import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";

const categoryColors = {
  Food: "#F97316",
  Travel: "#22C55E",
  Shopping: "#8B5CF6",
  Bills: "#EF4444",
  Entertainment: "#06B6D4",
  Health: "#EC4899",
  Education: "#EAB308",
  Other: "#64748B",
};

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const total = payload[0].payload.total;
    const percentage = ((item.value / total) * 100).toFixed(1);

    return (
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-lg">
        <p className="text-white font-semibold">{item.name}</p>
        <p className="text-cyan-400">
          ₹{item.value.toLocaleString("en-IN")}
        </p>
        <p className="text-slate-400 text-sm">{percentage}% of total</p>
      </div>
    );
  }

  return null;
}

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
      />
    </g>
  );
};

function ExpenseChart({
  expenses,
  selectedCategory,
  setSelectedCategory,
}) {
    const [activeIndex, setActiveIndex] = useState(0);
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Other";

    categoryTotals[category] =
      (categoryTotals[category] || 0) + Number(expense.amount);
  });

  let data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  // Sort highest to lowest
  data.sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Store total for tooltip
  data = data.map((item) => ({
    ...item,
    total,
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-8">
      <h2 className="text-white text-xl font-bold mb-6">
        Expenses by Category
      </h2>

      {data.length === 0 ? (
        <p className="text-slate-400 text-center py-12">
          No expense data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={75}
                    outerRadius={115}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    paddingAngle={3}
                    cornerRadius={8}
                    label={false}
                    labelLine={false}
                    isAnimationActive
                    animationDuration={900}
                    >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    categoryColors[entry.name] ||
                    categoryColors.Other
                  }
                />
              ))}
            </Pie>

            {/* Total in center */}
            <text
              x="50%"
              y="47%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="24"
              fontWeight="700"
            >
              ₹{total.toLocaleString("en-IN")}
            </text>

            <text
              x="50%"
              y="57%"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#94A3B8"
              fontSize="14"
            >
              Total Spend
            </text>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
        <div className="flex justify-end mb-4">
  <button
    onClick={() => setSelectedCategory("All")}
    className={`px-4 py-2 rounded-lg text-sm transition ${
      selectedCategory === "All"
        ? "bg-cyan-500 text-white"
        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
    }`}
  >
    All Categories
  </button>
</div>
      {/* Custom Legend */}
      {data.length > 0 && (
        <div className="mt-6 space-y-2">
          {data.map((item) => (
            <div
                key={item.name}
                onClick={() => setSelectedCategory(item.name)}
                className={`flex items-center justify-between rounded-lg px-4 py-2 cursor-pointer transition-all duration-300 ${
                    selectedCategory === item.name
                    ? "bg-purple-600/20 border border-purple-500 scale-[1.02]"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
                >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      categoryColors[item.name] ||
                      categoryColors.Other,
                  }}
                />

                <span className="text-white">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="text-white font-semibold">
                  ₹{item.value.toLocaleString("en-IN")}
                </p>

                <p className="text-slate-400 text-sm">
                  {((item.value / total) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;