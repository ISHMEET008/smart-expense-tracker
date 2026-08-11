import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: .7 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-slate-950/40 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto h-20 px-8 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">

            <Wallet className="text-white"/>

          </div>

          <div>

            <h1 className="text-2xl font-bold text-white">
              Finova AI
            </h1>

            <p className="text-xs text-slate-400">
              Smart Personal Finance
            </p>

          </div>

        </div>

        <div className="hidden lg:flex gap-10 text-slate-300">

          <a href="#features" className="hover:text-violet-400">
            Features
          </a>

          <a href="#about" className="hover:text-violet-400">
            About
          </a>

          <a href="#contact" className="hover:text-violet-400">
            Contact
          </a>

        </div>

        <div className="flex gap-4">

          <Link
          to="/login"
          className="border border-slate-700 px-5 py-2 rounded-lg text-slate-300 hover:border-violet-500">

            Login

          </Link>

          <Link
          to="/register"
          className="bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2 rounded-lg text-white">

            Get Started

          </Link>

        </div>

      </div>
    </motion.nav>
  );
}