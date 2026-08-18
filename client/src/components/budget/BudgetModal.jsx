import { useEffect, useState } from "react";

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();

const years = [
  currentYear - 1,
  currentYear,
  currentYear + 1,
];
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
  }, [editingBudget]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Budget Limit
            </label>

            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              required
            />
          </div>

           <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
            >
              Save Budget
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BudgetModal;