import {
  LayoutDashboard,
  Wallet,
  Receipt,
  PieChart,
  Target,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* Logo */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-white">
          Finova
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Smart Expense Tracker
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 px-5 py-8">

        <button className="w-full flex items-center gap-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl px-4 py-3 mb-4">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <Wallet size={20} />
          Wallet
        </button>

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <Receipt size={20} />
          Transactions
        </button>

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <PieChart size={20} />
          Analytics
        </button>

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <Target size={20} />
          Budget
        </button>

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <Sparkles size={20} />
          AI Insights
        </button>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-5">

        <button className="w-full flex items-center gap-4 text-slate-300 hover:bg-slate-800 rounded-xl px-4 py-3 mb-3 transition">
          <Settings size={20} />
          Settings
        </button>

        <button className="w-full flex items-center gap-4 text-red-400 hover:bg-red-500/10 rounded-xl px-4 py-3 transition">
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;