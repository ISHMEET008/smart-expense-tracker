import { useEffect, useState } from "react";

function BudgetModal({
  isOpen,
  onClose,
  onSave,
  editingBudget,
}) {
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
  });

  useEffect(() => {
    if (editingBudget) {
      setFormData({
        category: editingBudget.category,
        limit: editingBudget.limit,
      });
    } else {
      setFormData({
        category: "",
        limit: "",
      });
    }
  }, [editingBudget, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "limit"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-800 p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          {editingBudget ? "Edit Budget" : "Set Budget"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Category */}

          <div>
            <label className="block text-slate-300 mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Budget Limit */}

          <div>
            <label className="block text-slate-300 mb-2">
              Budget Limit (₹)
            </label>

            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Enter budget amount"
              min="1"
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:scale-105 transition"
            >
              {editingBudget ? "Update Budget" : "Save Budget"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default BudgetModal;