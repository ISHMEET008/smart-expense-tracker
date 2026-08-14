import CategoryChart from "../components/analytics/CategoryChart";
import MonthlyTrendChart from "../components/analytics/MonthlyTrendChart";
import PaymentMethodChart from "../components/analytics/PaymentMethodChart";
import WeekdayChart from "../components/analytics/WeekdayChart";
import MonthComparisonCard from "../components/analytics/MonthComparisonCard";
import exportCSV from "../utils/exportCSV";
import exportAnalyticsPDF from "../utils/exportPDF";
import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { getAnalytics } from "../services/expenseService";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analytics) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Analytics" />

        <div className="p-8">


          <p className="text-slate-400 mt-2">
            Insights into your spending habits.
          </p>
          
         <div className="flex justify-end gap-4 mb-6">

  <button
    onClick={() => exportAnalyticsPDF(analytics)}
    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
  >
    Export PDF
  </button>

  <button
    onClick={() => exportCSV(analytics.expenses)}
    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-5 py-3 rounded-xl hover:scale-105 transition">
    Export CSV
  </button>

</div>

          {/* KPI Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <p className="text-slate-400">Highest Expense</p>

              <h2 className="text-3xl font-bold text-red-400 mt-2">
                ₹{analytics.highestExpense.toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <p className="text-slate-400">Average Expense</p>

              <h2 className="text-3xl font-bold text-cyan-400 mt-2">
                ₹{analytics.averageExpense.toFixed(2)}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <p className="text-slate-400">Average Daily Spend</p>

              <h2 className="text-3xl font-bold text-green-400 mt-2">
                ₹{analytics.averageDailySpend.toFixed(2)}
              </h2>
            </div>

          </div>
          <MonthComparisonCard
  thisMonth={analytics.thisMonthTotal}
  lastMonth={analytics.lastMonthTotal}
  percentage={analytics.percentageChange}
/>
          {/* Monthly Trend */}
<div className="mt-8">
  <MonthlyTrendChart
    data={analytics?.monthlyTrend || []}
  />
</div>

{/* Category Breakdown - FULL WIDTH */}
<div className="mt-8">
  <CategoryChart
    data={analytics?.topCategories || []}
  />
</div>

{/* Bottom Row */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

  <PaymentMethodChart
    data={analytics?.paymentMethods || []}
  />

  <WeekdayChart
    data={analytics?.weekdaySpend || []}
  />

</div>

        </div>
      </div>
      
    </div>
    
  );
}
// console.log(analytics);
export default Analytics;