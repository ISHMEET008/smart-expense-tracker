import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">

      {/* Background Glow */}
      <div className="absolute -top-40 left-0 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[160px]" />
      <div className="absolute top-80 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />

      <div className="max-w-7xl mx-auto px-8">

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="text-center"
        >

          <span className="inline-block bg-slate-800 border border-slate-700 text-violet-300 rounded-full px-5 py-2">
            AI Powered Expense Tracker
          </span>

          <h1 className="text-6xl lg:text-7xl font-black text-white mt-8 leading-tight">

            Master Your Money

            <br />

            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              One Smart Decision
            </span>

            <br />

            at a Time

          </h1>

          <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto">

            Track expenses, manage budgets, receive AI-powered financial
            insights and build smarter money habits with Finova AI.

          </p>

          <div className="flex justify-center gap-5 mt-10">

            <Link
              to="/register"
              className="bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 rounded-xl text-white flex items-center gap-3 font-semibold"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <button className="border border-slate-700 px-8 py-4 rounded-xl text-white">
              Live Demo
            </button>

          </div>

        </motion.div>

        {/* Dashboard */}
        <div className="mt-24 flex justify-center">
          <DashboardPreview />
        </div>

      </div>

    </section>
  );
}