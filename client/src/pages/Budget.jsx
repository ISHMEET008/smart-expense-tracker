import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import BudgetSummary from "../components/budget/BudgetSummary";
import BudgetCard from "../components/budget/BudgetCard";
import BudgetModal from "../components/budget/BudgetModal";

import {
  getBudgetSummary,
  addBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgetService";

function Budget() {
  const [budgets, setBudgets] = useState([]);

  const [activeFilter, setActiveFilter] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const [sortBy, setSortBy] = useState("highestUsage");

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(
    today.getMonth() + 1
  );

  const [selectedYear, setSelectedYear] = useState(
    today.getFullYear()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  useEffect(() => {
    fetchBudgets();
  }, [selectedMonth, selectedYear]);

  const fetchBudgets = async () => {
    try {
      const response = await getBudgetSummary(
        selectedMonth,
        selectedYear
      );

      setBudgets(response.data.summary || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Open Add Modal
  const handleAdd = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  // Save Budget
  const handleSave = async (formData) => {
    try {
      if (editingBudget) {
        await updateBudget(editingBudget._id, formData);
      } else {
        await addBudget(formData);
      }

      setIsModalOpen(false);
      setEditingBudget(null);

      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Budget
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this budget?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBudget(id);
      fetchBudgets();
    } catch (error) {
      console.log(error);
    }
  };


 const filteredBudgets = budgets.filter((budget) => {
  const percentage =
    budget.limit > 0
      ? (budget.spent / budget.limit) * 100
      : 0;

  const matchesSearch = budget.category
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  if (activeFilter === "attention") {
    return percentage >= 80 && matchesSearch;
  }

  if (activeFilter === "onTrack") {
    return percentage < 80 && matchesSearch;
  }

  return matchesSearch;
});

const sortedBudgets = [...filteredBudgets].sort((a, b) => {
  const percentA =
    a.limit > 0 ? (a.spent / a.limit) * 100 : 0;

  const percentB =
    b.limit > 0 ? (b.spent / b.limit) * 100 : 0;

  switch (sortBy) {
    case "highestUsage":
      return percentB - percentA;

    case "lowestUsage":
      return percentA - percentB;

    case "highestBudget":
      return b.limit - a.limit;

    case "lowestBudget":
      return a.limit - b.limit;

    case "highestSpent":
      return b.spent - a.spent;

    case "lowestSpent":
      return a.spent - b.spent;

    case "az":
      return a.category.localeCompare(b.category);

    case "za":
      return b.category.localeCompare(a.category);

    default:
      return 0;
  }
});


const attentionCount = budgets.filter((budget) => {
  const percentage =
    budget.limit > 0
      ? (budget.spent / budget.limit) * 100
      : 0;

  return percentage >= 80;
}).length;

const onTrackCount = budgets.filter((budget) => {
  const percentage =
    budget.limit > 0
      ? (budget.spent / budget.limit) * 100
      : 0;

  return percentage < 80;
}).length;

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar title="Budget" />

        <div className="p-8">

          {/* Header */}

          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>

              <p className="text-slate-400 mt-2">
                Manage your monthly spending limits.
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* Month */}

              <select
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(Number(e.target.value))
                }
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>

              {/* Year */}

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(Number(e.target.value))
                }
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white"
              >
                {[2024, 2025, 2026, 2027, 2028].map((year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>

              {/* Button */}

              <button
                onClick={handleAdd}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:scale-105 transition"
              >
                + Set Budget
              </button>

            </div>

          </div>

          {/* Summary */}

          <div className="mt-8">
            <BudgetSummary budgets={budgets} />
          </div>


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">

  {/* Filter Buttons */}

  <div className="flex gap-3">

   <div className="flex gap-3 mt-8">

  <button
    onClick={() => setActiveFilter("all")}
    className={`px-5 py-2 rounded-xl transition ${
      activeFilter === "all"
        ? "bg-cyan-500 text-white"
        : "bg-slate-800 text-slate-300"
    }`}
  >
   All ({budgets.length})
  </button>

  <button
    onClick={() => setActiveFilter("attention")}
    className={`px-5 py-2 rounded-xl transition ${
      activeFilter === "attention"
        ? "bg-red-500 text-white"
        : "bg-slate-800 text-slate-300"
    }`}
  >
    Attention ({attentionCount})
  </button>

  <button
    onClick={() => setActiveFilter("onTrack")}
    className={`px-5 py-2 rounded-xl transition ${
      activeFilter === "onTrack"
        ? "bg-green-500 text-white"
        : "bg-slate-800 text-slate-300"
    }`}
  >
    On Track ({onTrackCount})
  </button>

</div>

  </div>

  {/* Search */}

  <div className="flex gap-3">

  <input
    type="text"
    placeholder="🔍 Search category..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white w-72 focus:outline-none focus:border-cyan-500"
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
  >
    <option value="highestUsage">Highest Usage</option>
    <option value="lowestUsage">Lowest Usage</option>
    <option value="highestBudget">Highest Budget</option>
    <option value="lowestBudget">Lowest Budget</option>
    <option value="highestSpent">Highest Spent</option>
    <option value="lowestSpent">Lowest Spent</option>
    <option value="az">Category A-Z</option>
    <option value="za">Category Z-A</option>
  </select>

</div>

</div>


          {/* Budget Cards */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {sortedBudgets.length > 0 ? (
             sortedBudgets.map((budget) => (
                <BudgetCard
                  key={budget._id}
                  budget={budget}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
                <h2 className="text-2xl text-white font-bold">
                  No Budgets Found
                </h2>

                <p className="text-slate-400 mt-3">
                  No budgets exist for the selected month.
                </p>
              </div>
            )}

          </div>

          <BudgetModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingBudget(null);
            }}
            onSave={handleSave}
            editingBudget={editingBudget}
          />

        </div>
      </div>
    </div>
  );
}

export default Budget;