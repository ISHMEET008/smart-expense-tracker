import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  addExpense,
  updateExpense,
} from "../../services/expenseService";

function AddExpense({
  onClose,
  onExpenseAdded,
  editingExpense = null,
}) {
  const [formData, setFormData] = useState({
    title: editingExpense?.title || "",
    amount: editingExpense?.amount || "",
    category: editingExpense?.category || "Food",
    paymentMethod: editingExpense?.paymentMethod || "UPI",
    date: editingExpense?.date
      ? new Date(editingExpense.date).toISOString().split("T")[0]
      : "",
    note: editingExpense?.note || "",
  });

  const [loading, setLoading] = useState(false);

  const isEditing = !!editingExpense;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      let response;

      if (isEditing) {
        response = await updateExpense(
          editingExpense._id,
          formData
        );

        toast.success("Expense updated successfully ✨");
      } else {
        response = await addExpense(formData);

        toast.success("Expense added successfully 🎉");
      }

      if (onExpenseAdded) {
        onExpenseAdded(response.data.expense);
      }

      onClose();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        (isEditing
          ? "Failed to update expense"
          : "Failed to add expense")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

      <div className="w-full max-w-xl bg-slate-900 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Expense" : "Add Expense"}
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              {isEditing
                ? "Update your expense details"
                : "Record a new expense"}
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          >
            <X className="text-slate-300" size={20} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-slate-300 text-sm">
              Expense Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Dinner"
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-slate-300 text-sm">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="₹ 0"
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-slate-300 text-sm">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
            >
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

          {/* Payment Method */}
          <div>
            <label className="text-slate-300 text-sm">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Net Banking</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-slate-300 text-sm">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none"
            />
          </div>

          {/* Note */}
          <div>
            <label className="text-slate-300 text-sm">
              Note
            </label>

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Optional note..."
              rows="3"
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="w-1/2 p-3 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 p-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                  ? "Update Expense"
                  : "Save Expense"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddExpense;