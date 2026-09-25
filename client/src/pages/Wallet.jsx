import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Wallet as WalletIcon,
  IndianRupee,
  TrendingDown,
  TrendingUp,
  Pencil,
  Home,
  Utensils,
  Receipt,
  Bus,
  MoreHorizontal,
  X,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";

import {
  getFinancialSummary,
  updateFinancialDetails,
} from "../services/financialService";

import toast from "react-hot-toast";

import { getExpenses } from "../services/expenseService";
function Wallet() {
const navigate = useNavigate();
  // ================= STATES =================

  const [financialData, setFinancialData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    rent: "",
    food: "",
    bills: "",
    transport: "",
    other: "",
  });
const [recentTransactions, setRecentTransactions] = useState([]);

  // ================= FETCH FINANCIAL DATA =================

 const fetchFinancialData = async () => {
  try {
    setLoading(true);

    // First load financial data
    const financialResponse = await getFinancialSummary();

    setFinancialData(financialResponse.data);

    // Then load expenses separately
    try {
      const expenseResponse = await getExpenses();

      const expenses =
        expenseResponse.data.expenses || [];

      const latestTransactions = [...expenses]
        .sort(
          (a, b) =>
            new Date(b.date) - new Date(a.date)
        )
        .slice(0, 5);

      setRecentTransactions(latestTransactions);

    } catch (expenseError) {
      console.log(
        "Could not load recent transactions:",
        expenseError
      );

      // Wallet should still work even if
      // recent transactions fail
      setRecentTransactions([]);
    }

  } catch (error) {
    console.log(
      "Wallet financial data error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to load financial data"
    );

  } finally {
    setLoading(false);
  }
};
// 👇 ADD THIS
useEffect(() => {
  fetchFinancialData();
}, []);

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// ================= OPEN EDIT MODAL =================

const handleOpenEdit = () => {
  if (!financialData) return;

  setFormData({
    monthlyIncome: financialData.income ?? "",
    rent: financialData.monthlyEssentials?.rent ?? "",
    food: financialData.monthlyEssentials?.food ?? "",
    bills: financialData.monthlyEssentials?.bills ?? "",
    transport: financialData.monthlyEssentials?.transport ?? "",
    other: financialData.monthlyEssentials?.other ?? "",
  });

  setShowEditModal(true);
};

  // ================= SAVE FINANCIAL DETAILS =================

  const handleSave = async (e) => {

    e.preventDefault();

    // Basic validation
    if (
      formData.monthlyIncome === "" ||
      Number(formData.monthlyIncome) < 0
    ) {

      toast.error(
        "Please enter a valid monthly income"
      );

      return;
    }


    const fields = [
      "rent",
      "food",
      "bills",
      "transport",
      "other",
    ];


    for (const field of fields) {

      if (
        formData[field] !== "" &&
        Number(formData[field]) < 0
      ) {

        toast.error(
          `Please enter a valid value for ${field}`
        );

        return;
      }
    }


    try {

      setSaving(true);


      const response =
        await updateFinancialDetails({

          monthlyIncome:
            Number(
              formData.monthlyIncome
            ),

          rent:
            Number(formData.rent) || 0,

          food:
            Number(formData.food) || 0,

          bills:
            Number(formData.bills) || 0,

          transport:
            Number(formData.transport) || 0,

          other:
            Number(formData.other) || 0,
        });


      // Update Wallet immediately
      // using backend response
      setFinancialData(
        response.data.financialData
      );


      setShowEditModal(false);


      toast.success(
        "Financial details updated successfully"
      );

    } catch (error) {

      console.log(
        "Update financial details error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update financial details"
      );

    } finally {

      setSaving(false);

    }
  };

const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return "🍔";

    case "Travel":
      return "✈️";

    case "Shopping":
      return "🛍️";

    case "Bills":
      return "📄";

    case "Entertainment":
      return "🎬";

    case "Health":
      return "🏥";

    case "Education":
      return "📚";

    default:
      return "📦";
  }
};


const getCategoryColor = (category) => {
  switch (category) {
    case "Food":
      return "bg-orange-500/10 text-orange-400";

    case "Travel":
      return "bg-blue-500/10 text-blue-400";

    case "Shopping":
      return "bg-pink-500/10 text-pink-400";

    case "Bills":
      return "bg-yellow-500/10 text-yellow-400";

    case "Entertainment":
      return "bg-violet-500/10 text-violet-400";

    case "Health":
      return "bg-red-500/10 text-red-400";

    case "Education":
      return "bg-green-500/10 text-green-400";

    default:
      return "bg-slate-700/30 text-slate-300";
  }
};

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="flex bg-slate-950 min-h-screen">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <div className="p-8">

            <div className="flex items-center justify-center min-h-[70vh]">

              <div className="text-center">

                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <p className="text-slate-400 mt-4">

                  Loading your wallet...

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }


  // ================= FINANCIAL VALUES =================

  const income =
    Number(
      financialData?.income || 0
    );


  const essentialExpenses =
    Number(
      financialData?.essentialExpenses || 0
    );


  const actualSpending =
    Number(
      financialData?.actualSpending || 0
    );


  const currentBalance =
    Number(
      financialData?.currentBalance || 0
    );


  const essentials =
    financialData?.monthlyEssentials || {

      rent: 0,
      food: 0,
      bills: 0,
      transport: 0,
      other: 0,

    };


  // ================= PERCENTAGES =================

  const spendingPercentage =
    income > 0
      ? Math.min(
          (actualSpending / income) * 100,
          100
        )
      : 0;


  const essentialPercentage =
    income > 0
      ? Math.min(
          (essentialExpenses / income) * 100,
          100
        )
      : 0;


  return (

    <div className="flex bg-slate-950 min-h-screen">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />


      {/* ================= MAIN ================= */}

      <div className="flex-1">

        {/* ================= NAVBAR ================= */}

        <Navbar title="Wallet" />


        <div className="p-8">

          {/* ================= HEADER ================= */}

          <div className="flex items-center justify-between">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">

                  <WalletIcon
                    size={25}
                    className="text-purple-400"
                  />

                </div>


                <div>

                  {/* <h1 className="text-white text-4xl font-bold">

                    Wallet

                  </h1> */}

                  <p className="text-slate-400 mt-1">

                    Your complete financial overview

                  </p>

                </div>

              </div>

            </div>


            {/* EDIT FINANCIAL DETAILS */}

            <button

              onClick={handleOpenEdit}

              className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-slate-200 px-5 py-3 rounded-xl font-semibold hover:border-purple-500 hover:bg-slate-800 transition"

            >

              <Pencil size={17} />

              Edit Financial Details

            </button>

          </div>


          {/* ================= AVAILABLE BALANCE ================= */}

          <div className="mt-8">

            <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-slate-900 to-cyan-900/30 p-8">

              <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>


              <div className="relative">

                <div className="flex items-center gap-2 text-slate-400">

                  <IndianRupee size={18} />

                  <span className="text-sm font-medium">

                    Current Available Balance

                  </span>

                </div>


                <h2
                  className={`text-5xl font-bold mt-3 ${
                    currentBalance >= 0
                      ? "text-white"
                      : "text-red-400"
                  }`}
                >

                  {currentBalance < 0
                    ? "- "
                    : ""}
                  ₹
                  {Math.abs(
                    currentBalance
                  ).toLocaleString("en-IN")}

                </h2>


                {currentBalance < 0 ? (

                  <p className="text-red-400 text-sm mt-2">

                    You have exceeded your available funds.

                  </p>

                ) : (

                  <p className="text-slate-400 text-sm mt-2">

                    Available after essentials and actual spending.

                  </p>

                )}

              </div>

            </div>

          </div>


          {/* ================= FINANCIAL SNAPSHOT ================= */}

          <div className="mt-8">

            <h2 className="text-white text-2xl font-semibold">

              Financial Snapshot

            </h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

              {/* MONTHLY INCOME */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-green-500/40 transition">

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center">

                    <TrendingUp
                      size={21}
                      className="text-green-400"
                    />

                  </div>

                </div>


                <p className="text-slate-400 mt-5">

                  Monthly Income

                </p>


                <h3 className="text-green-400 text-3xl font-bold mt-2">

                  ₹
                  {income.toLocaleString(
                    "en-IN"
                  )}

                </h3>

              </div>


              {/* ESSENTIAL EXPENSES */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-orange-500/40 transition">

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">

                    <TrendingDown
                      size={21}
                      className="text-orange-400"
                    />

                  </div>

                </div>


                <p className="text-slate-400 mt-5">

                  Essential Expenses

                </p>


                <h3 className="text-orange-400 text-3xl font-bold mt-2">

                  ₹
                  {essentialExpenses.toLocaleString(
                    "en-IN"
                  )}

                </h3>

              </div>


              {/* ACTUAL SPENDING */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-red-500/40 transition">

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">

                    <TrendingDown
                      size={21}
                      className="text-red-400"
                    />

                  </div>

                </div>


                <p className="text-slate-400 mt-5">

                  Actual Spending

                </p>


                <h3 className="text-red-400 text-3xl font-bold mt-2">

                  ₹
                  {actualSpending.toLocaleString(
                    "en-IN"
                  )}

                </h3>

              </div>

            </div>

          </div>


          {/* ================= MONTHLY OVERVIEW ================= */}

          <div className="mt-8">

            <h2 className="text-white text-2xl font-semibold">

              Monthly Financial Overview

            </h2>


            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-4">

              <div className="space-y-6">

                {/* INCOME */}

                <div>

                  <div className="flex justify-between items-center">

                    <span className="text-slate-400">

                      Monthly Income

                    </span>

                    <span className="text-green-400 font-semibold">

                      ₹
                      {income.toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>


                {/* ESSENTIALS */}

                <div>

                  <div className="flex justify-between items-center">

                    <span className="text-slate-400">

                      Essential Expenses

                    </span>

                    <span className="text-orange-400 font-semibold">

                      ₹
                      {essentialExpenses.toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>


                  <div className="w-full bg-slate-800 rounded-full h-2 mt-3">

                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${essentialPercentage}%`,
                      }}
                    ></div>

                  </div>

                </div>


                {/* ACTUAL SPENDING */}

                <div>

                  <div className="flex justify-between items-center">

                    <span className="text-slate-400">

                      Actual Spending

                    </span>

                    <span className="text-red-400 font-semibold">

                      ₹
                      {actualSpending.toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>


                  <div className="w-full bg-slate-800 rounded-full h-2 mt-3">

                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${spendingPercentage}%`,
                      }}
                    ></div>

                  </div>

                </div>


                {/* CURRENT BALANCE */}

                <div className="pt-5 border-t border-slate-800">

                  <div className="flex justify-between items-center">

                    <span className="text-white font-semibold">

                      Current Balance

                    </span>

                    <span
                      className={`font-bold text-xl ${
                        currentBalance >= 0
                          ? "text-cyan-400"
                          : "text-red-400"
                      }`}
                    >

                      {currentBalance < 0
                        ? "- "
                        : ""}
                      ₹
                      {Math.abs(
                        currentBalance
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ================= ESSENTIAL EXPENSES ================= */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-white text-2xl font-semibold">

                  Essential Expenses

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Your planned monthly essentials

                </p>

              </div>


              <button

                onClick={handleOpenEdit}

                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition"

              >

                <Pencil size={16} />

                Edit

              </button>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">

              {/* RENT */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">

                  <Home
                    size={19}
                    className="text-blue-400"
                  />

                </div>

                <p className="text-slate-400 mt-4 text-sm">

                  Rent

                </p>

                <p className="text-white text-xl font-bold mt-1">

                  ₹
                  {Number(
                    essentials.rent || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>


              {/* FOOD */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">

                  <Utensils
                    size={19}
                    className="text-orange-400"
                  />

                </div>

                <p className="text-slate-400 mt-4 text-sm">

                  Food

                </p>

                <p className="text-white text-xl font-bold mt-1">

                  ₹
                  {Number(
                    essentials.food || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>


              {/* BILLS */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">

                  <Receipt
                    size={19}
                    className="text-yellow-400"
                  />

                </div>

                <p className="text-slate-400 mt-4 text-sm">

                  Bills

                </p>

                <p className="text-white text-xl font-bold mt-1">

                  ₹
                  {Number(
                    essentials.bills || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>


              {/* TRANSPORT */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">

                  <Bus
                    size={19}
                    className="text-cyan-400"
                  />

                </div>

                <p className="text-slate-400 mt-4 text-sm">

                  Transport

                </p>

                <p className="text-white text-xl font-bold mt-1">

                  ₹
                  {Number(
                    essentials.transport || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>


              {/* OTHER */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">

                  <MoreHorizontal
                    size={19}
                    className="text-purple-400"
                  />

                </div>

                <p className="text-slate-400 mt-4 text-sm">

                  Other

                </p>

                <p className="text-white text-xl font-bold mt-1">

                  ₹
                  {Number(
                    essentials.other || 0
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>

            </div>

          </div>


                  {/* ================= RECENT TRANSACTIONS ================= */}

<div className="mt-8">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-white text-2xl font-semibold">
        Recent Transactions
      </h2>

      <p className="text-slate-400 text-sm mt-1">
        Your latest spending activity
      </p>

    </div>


    <button
  onClick={() => navigate("/transactions")}
  className="text-purple-400 hover:text-purple-300 font-medium transition"
>
  View All →
</button>
  </div>


  <div className="bg-slate-900 border border-slate-800 rounded-2xl mt-4 overflow-hidden">

    {recentTransactions.length === 0 ? (

      <div className="p-8 text-center">

        <div className="text-5xl mb-3">
          💸
        </div>

        <p className="text-white font-semibold">
          No transactions yet
        </p>

        <p className="text-slate-400 text-sm mt-1">
          Your recent expenses will appear here.
        </p>

      </div>

    ) : (

      <div>

        {recentTransactions.map(
          (expense, index) => (

            <div
              key={expense._id}
              className={`p-5 flex items-center justify-between hover:bg-slate-800/50 transition ${
                index !==
                recentTransactions.length - 1
                  ? "border-b border-slate-800"
                  : ""
              }`}
            >

              {/* LEFT */}

              <div className="flex items-center gap-4">

                {/* CATEGORY ICON */}

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${getCategoryColor(
                    expense.category
                  )}`}
                >
                  {getCategoryIcon(
                    expense.category
                  )}
                </div>


                {/* DETAILS */}

                <div>

                  <h3 className="text-white font-semibold">

                    {expense.title}

                  </h3>


                  <div className="flex items-center gap-2 mt-1 flex-wrap">

                    <span className="text-slate-400 text-sm">

                      {expense.category}

                    </span>

                    <span className="text-slate-600">
                      •
                    </span>

                    <span className="text-slate-500 text-sm">

                      {expense.paymentMethod}

                    </span>

                  </div>


                  {expense.date && (

                    <p className="text-slate-600 text-xs mt-1">

                      {new Date(
                        expense.date
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}

                    </p>

                  )}

                </div>

              </div>


              {/* AMOUNT */}

              <div className="text-right">

                <p className="text-red-400 font-bold text-lg">

                  - ₹
                  {Number(
                    expense.amount
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

                <p className="text-slate-600 text-xs mt-1">

                  Expense

                </p>

              </div>

            </div>

          )
        )}

      </div>

    )}

  </div>

</div>

          {/* ================= SPENDING STATUS ================= */}

          <div className="mt-8">

            <h2 className="text-white text-2xl font-semibold">

              Spending Status

            </h2>


            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mt-4">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-400">

                    Actual spending from monthly income

                  </p>

                  <p className="text-white text-2xl font-bold mt-1">

                    {spendingPercentage.toFixed(0)}%

                  </p>

                </div>


                <div className="text-right">

                  <p className="text-slate-500 text-sm">

                    Spent

                  </p>

                  <p className="text-red-400 font-semibold">

                    ₹
                    {actualSpending.toLocaleString(
                      "en-IN"
                    )}

                  </p>

                </div>

              </div>


              <div className="w-full bg-slate-800 rounded-full h-3 mt-5 overflow-hidden">

                <div
                  className={`h-3 rounded-full transition-all duration-700 ${
                    spendingPercentage >= 90
                      ? "bg-red-500"
                      : spendingPercentage >= 70
                      ? "bg-yellow-500"
                      : "bg-cyan-500"
                  }`}
                  style={{
                    width: `${spendingPercentage}%`,
                  }}
                ></div>

              </div>


              <p className="text-slate-500 text-sm mt-3">

                ₹
                {Math.max(
                  income - actualSpending,
                  0
                ).toLocaleString(
                  "en-IN"
                )}{" "}

                remaining from your monthly income before considering planned essentials.

              </p>

            </div>

          </div>


          <div className="h-10"></div>

        </div>

      </div>


      {/* ================================================== */}
      {/* EDIT FINANCIAL DETAILS MODAL */}
      {/* ================================================== */}

      {showEditModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              if (!saving) {
                setShowEditModal(false);
              }
            }}
          ></div>


          {/* MODAL */}

          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl shadow-black/40 overflow-hidden">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between px-7 py-6 border-b border-slate-800">

              <div>

                <h2 className="text-white text-2xl font-bold">

                  Edit Financial Details

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Update your monthly income and planned essentials.

                </p>

              </div>


              <button

                type="button"

                onClick={() => {
                  if (!saving) {
                    setShowEditModal(false);
                  }
                }}

                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition"

              >

                <X
                  size={20}
                  className="text-slate-300"
                />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSave}
              className="p-7"
            >

              {/* MONTHLY INCOME */}

              <div className="mb-6">

                <label className="block text-slate-300 text-sm font-medium mb-2">

                  Monthly Income

                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">

                    ₹

                  </span>

                  <input

                    type="number"

                    name="monthlyIncome"

                    value={
                      formData.monthlyIncome
                    }

                    onChange={handleChange}

                    min="0"

                    step="0.01"

                    placeholder="Enter monthly income"

                    className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                    required

                  />

                </div>

              </div>


              {/* ESSENTIAL EXPENSES */}

              <div>

                <h3 className="text-white font-semibold text-lg mb-4">

                  Monthly Essential Expenses

                </h3>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* RENT */}

                  <div>

                    <label className="block text-slate-400 text-sm mb-2">

                      Rent

                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                        ₹

                      </span>

                      <input

                        type="number"

                        name="rent"

                        value={
                          formData.rent
                        }

                        onChange={
                          handleChange
                        }

                        min="0"

                        step="0.01"

                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                      />

                    </div>

                  </div>


                  {/* FOOD */}

                  <div>

                    <label className="block text-slate-400 text-sm mb-2">

                      Food

                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                        ₹

                      </span>

                      <input

                        type="number"

                        name="food"

                        value={
                          formData.food
                        }

                        onChange={
                          handleChange
                        }

                        min="0"

                        step="0.01"

                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                      />

                    </div>

                  </div>


                  {/* BILLS */}

                  <div>

                    <label className="block text-slate-400 text-sm mb-2">

                      Bills

                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                        ₹

                      </span>

                      <input

                        type="number"

                        name="bills"

                        value={
                          formData.bills
                        }

                        onChange={
                          handleChange
                        }

                        min="0"

                        step="0.01"

                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                      />

                    </div>

                  </div>


                  {/* TRANSPORT */}

                  <div>

                    <label className="block text-slate-400 text-sm mb-2">

                      Transport

                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                        ₹

                      </span>

                      <input

                        type="number"

                        name="transport"

                        value={
                          formData.transport
                        }

                        onChange={
                          handleChange
                        }

                        min="0"

                        step="0.01"

                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                      />

                    </div>

                  </div>


                  {/* OTHER */}

                  <div className="md:col-span-2">

                    <label className="block text-slate-400 text-sm mb-2">

                      Other

                    </label>

                    <div className="relative">

                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">

                        ₹

                      </span>

                      <input

                        type="number"

                        name="other"

                        value={
                          formData.other
                        }

                        onChange={
                          handleChange
                        }

                        min="0"

                        step="0.01"

                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"

                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* PREVIEW */}

              <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-5">

                <p className="text-slate-400 text-sm">

                  New Essential Expenses

                </p>

                <p className="text-orange-400 text-2xl font-bold mt-1">

                  ₹
                  {(
                    Number(
                      formData.rent || 0
                    ) +
                    Number(
                      formData.food || 0
                    ) +
                    Number(
                      formData.bills || 0
                    ) +
                    Number(
                      formData.transport || 0
                    ) +
                    Number(
                      formData.other || 0
                    )
                  ).toLocaleString(
                    "en-IN"
                  )}

                </p>

              </div>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-7">

                <button

                  type="button"

                  onClick={() => {
                    if (!saving) {
                      setShowEditModal(false);
                    }
                  }}

                  disabled={saving}

                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition disabled:opacity-50"

                >

                  Cancel

                </button>


                <button

                  type="submit"

                  disabled={saving}

                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


export default Wallet;