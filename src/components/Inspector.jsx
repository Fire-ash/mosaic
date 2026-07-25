import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const metrics = [
  {
    id: "expense",
    label: "Expense Ratio",
    value: "0.68%",
    detail: "Cost-efficient access to a diversified core strategy.",
    tone: "from-sky-500/20 to-cyan-400/10 text-sky-200",
    chips: ["Low Cost", "Efficient", "Core"],
  },
  {
    id: "aum",
    label: "AUM",
    value: "₹74,000 Cr",
    detail: "Large scale supports liquidity and institutional depth.",
    tone: "from-violet-500/20 to-fuchsia-400/10 text-violet-200",
    chips: ["Liquid", "Scale", "Institutional"],
  },
  {
    id: "risk",
    label: "Risk",
    value: "Moderate",
    detail: "Balanced posture with controlled drawdown potential.",
    tone: "from-amber-500/20 to-orange-400/10 text-amber-200",
    chips: ["Balanced", "Diversified", "Resilient"],
  },
  {
    id: "holdings",
    label: "Top Holdings",
    value: "HDFC Bank, Infosys",
    detail: "High-quality names spanning banking and technology.",
    tone: "from-emerald-500/20 to-lime-400/10 text-emerald-200",
    chips: ["Banking", "Tech", "Quality"],
  },
];

export default function Inspector() {
  const [activeMetricId, setActiveMetricId] = useState("expense");
  const activeMetric = metrics.find((item) => item.id === activeMetricId) ?? metrics[0];

  return (
    <aside className="flex w-80 flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(7,11,18,0.96),rgba(5,8,14,0.98))] p-5 backdrop-blur-xl">
      <div className="border-b border-white/10 pb-4" />

      <div className="mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMetric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${activeMetric.tone} p-4 shadow-[0_20px_50px_rgba(0,0,0,0.24)]`}
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">Selected</p>
            <p className="mt-2 text-xl font-extrabold text-white">{activeMetric.label}</p>
            <p className="mt-3 text-3xl font-black tracking-[-0.03em] text-white">{activeMetric.value}</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">{activeMetric.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeMetric.chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-100">
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 grid gap-2">
        {metrics.map((item) => (
          <motion.button
            key={item.id}
            type="button"
            whileHover={{ y: -2, scale: 1.01 }}
            onMouseEnter={() => setActiveMetricId(item.id)}
            className={`rounded-[18px] border border-white/10 bg-white/5 px-3 py-3 text-left transition-colors ${activeMetricId === item.id ? "bg-white/10" : "hover:bg-white/10"}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">{item.label}</span>
              <span className="text-sm font-semibold text-slate-100">{item.value}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </aside>
  );
}