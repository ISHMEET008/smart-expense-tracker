import {
  Sparkles,
  Wallet,
  ScanLine,
  BarChart3
} from "lucide-react";

const features = [
  {
    icon: <Wallet size={40} />,
    title: "Expense Tracking",
    desc: "Track every expense with beautiful organization."
  },
  {
    icon: <Sparkles size={40} />,
    title: "AI Insights",
    desc: "Receive intelligent financial recommendations."
  },
  {
    icon: <ScanLine size={40} />,
    title: "Receipt Scanner",
    desc: "Upload receipts and auto-fill expense details."
  },
  {
    icon: <BarChart3 size={40} />,
    title: "Analytics",
    desc: "Interactive charts and monthly reports."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-white">
          Why Finova AI?
        </h2>

        <p className="text-slate-400 text-center mt-4">
          Everything you need to manage your finances.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-violet-500 transition-all duration-300 hover:-translate-y-2"
            >

              <div className="text-violet-400">
                {feature.icon}
              </div>

              <h3 className="text-white text-2xl font-semibold mt-6">
                {feature.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}