import { motion } from "framer-motion";

const stats = [
  {
    number: "10K+",
    title: "Transactions"
  },
  {
    number: "98%",
    title: "AI Accuracy"
  },
  {
    number: "24/7",
    title: "Smart Insights"
  },
  {
    number: "50+",
    title: "Budget Plans"
  }
];

export default function Stats() {
  return (
    <section className="py-20">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center"
          >

            <h2 className="text-5xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              {item.number}
            </h2>

            <p className="text-slate-400 mt-3">
              {item.title}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}