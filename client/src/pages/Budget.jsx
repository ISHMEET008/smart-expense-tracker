import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import BudgetChart from "../components/budget/BudgetChart";
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
<BudgetChart budgets={budgets} />
          {/* Budget Cards */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {budgets.length > 0 ? (
              budgets.map((budget) => (
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