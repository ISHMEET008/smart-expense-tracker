import { useState } from "react";
import axios from "axios";
import { IndianRupee, Home, Utensils, Zap, Car, Package, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function FinancialSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    rent: "",
    food: "",
    bills: "",
    transport: "",
    other: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalEssentials =
    Number(formData.rent || 0) +
    Number(formData.food || 0) +
    Number(formData.bills || 0) +
    Number(formData.transport || 0) +
    Number(formData.other || 0);

  const availableMoney =
    Number(formData.monthlyIncome || 0) - totalEssentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.monthlyIncome) {
      toast.error("Please enter your monthly income");
      return;
    }

    if (availableMoney < 0) {
      toast.error("Your essential expenses cannot be greater than your income");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/financial/setup",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Financial setup completed!");

        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <IndianRupee className="text-emerald-400" size={28} />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Let's set up your finances
          </h1>

          <p className="text-slate-400 mt-2">
            Tell us about your monthly income and essential expenses
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl"
        >

          {/* Monthly Income */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Monthly Income
            </label>

            <div className="relative">
              <IndianRupee
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                placeholder="Enter your monthly income"
                min="0"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Essentials */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-white">
                Monthly Essential Expenses
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                These are the expenses you normally need to take care of every
                month.
              </p>
            </div>

            <div className="space-y-4">

              {/* Rent */}
              <ExpenseInput
                icon={<Home size={19} />}
                label="Rent"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="0"
              />

              {/* Food */}
              <ExpenseInput
                icon={<Utensils size={19} />}
                label="Food"
                name="food"
                value={formData.food}
                onChange={handleChange}
                placeholder="0"
              />

              {/* Bills */}
              <ExpenseInput
                icon={<Zap size={19} />}
                label="Bills"
                name="bills"
                value={formData.bills}
                onChange={handleChange}
                placeholder="0"
              />

              {/* Transport */}
              <ExpenseInput
                icon={<Car size={19} />}
                label="Transport"
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                placeholder="0"
              />

              {/* Other */}
              <ExpenseInput
                icon={<Package size={19} />}
                label="Other"
                name="other"
                value={formData.other}
                onChange={handleChange}
                placeholder="0"
              />

            </div>
          </div>

          {/* Calculation */}
          <div className="mt-8 bg-slate-800/70 border border-slate-700 rounded-2xl p-5">

            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400">
                Monthly Income
              </span>

              <span className="text-white font-medium">
                ₹{formatAmount(Number(formData.monthlyIncome || 0))}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-slate-700">
              <span className="text-slate-400">
                Essential Expenses
              </span>

              <span className="text-white font-medium">
                ₹{formatAmount(totalEssentials)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4">
              <span className="text-slate-300 font-medium">
                Available After Essentials
              </span>

              <span
                className={`text-xl font-bold ${
                  availableMoney < 0
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                ₹{formatAmount(Math.max(availableMoney, 0))}
              </span>
            </div>

          </div>

          {/* Continue */}
          <button
            type="submit"
            className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
          >
            Continue to Dashboard
            <ArrowRight size={19} />
          </button>

        </form>
      </div>
    </div>
  );
}

function ExpenseInput({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
        {icon}
      </div>

      <div className="flex-1">
        <label className="block text-sm text-slate-300 mb-1.5">
          {label}
        </label>

        <div className="relative">
          <IndianRupee
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="number"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min="0"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-9 pr-4 text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>
    </div>
  );
}

export default FinancialSetup;