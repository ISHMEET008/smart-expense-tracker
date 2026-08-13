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

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuClass = ({ isActive }) =>
    `w-full flex items-center gap-4 rounded-xl px-4 py-3 mb-3 transition ${
      isActive
        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;

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

        {/* Dashboard */}
        <NavLink to="/dashboard" className={menuClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Wallet */}
        <NavLink to="/wallet" className={menuClass}>
          <Wallet size={20} />
          Wallet
        </NavLink>

        {/* Transactions */}
        <NavLink to="/transactions" className={menuClass}>
          <Receipt size={20} />
          Transactions
        </NavLink>

        {/* Analytics */}
        <NavLink to="/analytics" className={menuClass}>
          <PieChart size={20} />
          Analytics
        </NavLink>

        {/* Budget */}
        <NavLink to="/budget" className={menuClass}>
          <Target size={20} />
          Budget
        </NavLink>

        {/* AI Insights */}
        <NavLink to="/insights" className={menuClass}>
          <Sparkles size={20} />
          AI Insights
        </NavLink>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 p-5">

        <NavLink to="/settings" className={menuClass}>
          <Settings size={20} />
          Settings
        </NavLink>

        <button className="w-full flex items-center gap-4 text-red-400 hover:bg-red-500/10 rounded-xl px-4 py-3 transition">
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Sidebar;