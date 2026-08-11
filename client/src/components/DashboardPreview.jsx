import { motion } from "framer-motion";
import {
  Sparkles,
  Wallet,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Car,
  Utensils,
  Bell,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      {/* Floating Notification */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -top-6 -right-6 bg-violet-600 text-white rounded-2xl px-4 py-3 shadow-xl z-20"
      >
        <div className="flex items-center gap-2">
          <Bell size={18} />
          <div>
            <p className="text-xs">AI Alert</p>
            <p className="text-sm font-semibold">
              Saved ₹1,250 this week 🎉
            </p>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-5xl rounded-[30px] border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(124,58,237,.25)]">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Wallet Balance</p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl font-bold text-white mt-2"
            >
              ₹52,430
            </motion.h1>

            <div className="flex items-center gap-2 text-green-400 mt-2">
              <TrendingUp size={18} />
              +8.2% this month
            </div>
          </div>

          <div className="bg-gradient-to-r from-violet-600 to-cyan-500 p-4 rounded-2xl">
            <Wallet className="text-white" />
          </div>
        </div>

        {/* Financial Health */}
        <div className="mt-6 bg-slate-800 rounded-2xl p-5">

          <div className="flex justify-between items-center">

            <span className="text-white font-semibold">
              Financial Health
            </span>

            <span className="text-green-400 font-bold">
              84 / 100
            </span>

          </div>

          <div className="w-full h-3 rounded-full bg-slate-700 mt-4">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "84%" }}
              transition={{ duration: 2 }}
              className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
            />

          </div>

        </div>

        {/* AI Insight */}
        <div className="mt-6 bg-slate-800 rounded-2xl p-5">

          <div className="flex justify-between items-center">

            <span className="text-white font-semibold">
              AI Insight
            </span>

            <Sparkles className="text-violet-400" />

          </div>

          <p className="text-slate-300 mt-4">
            Great job 🎉
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Your food expenses dropped by
            <span className="text-green-400 font-semibold">
              {" "}14%
            </span>
            . Keep this habit to save nearly ₹1800/month.
          </p>

        </div>

        {/* Recent Spending */}

        <div className="mt-6">

          <p className="text-slate-300 font-semibold mb-4">
            Recent Transactions
          </p>

          <div className="space-y-3">

            <Transaction
              icon={<Utensils className="text-orange-400" />}
              title="Restaurant"
              amount="-₹450"
            />

            <Transaction
              icon={<ShoppingBag className="text-pink-400" />}
              title="Shopping"
              amount="-₹890"
            />

            <Transaction
              icon={<Car className="text-cyan-400" />}
              title="Travel"
              amount="-₹220"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="mt-6 flex justify-between items-center border-t border-slate-700 pt-4">

          <span className="text-slate-400 text-sm">
            This Month
          </span>

          <div className="flex items-center gap-2 text-red-400">

            <TrendingDown size={16} />

            ₹12,480

          </div>

        </div>

      </div>

    </motion.div>
  );
}

function Transaction({ icon, title, amount }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-white">{title}</span>
      </div>

      <span className="text-white font-medium">
        {amount}
      </span>
    </motion.div>
  );
}