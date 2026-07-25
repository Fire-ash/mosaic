import { motion } from "framer-motion";

const styles = {
  portfolio: {
    shell: "border border-sky-400/30 bg-gradient-to-r from-sky-600 to-blue-700 text-white",
    content: "px-5 py-3.5 rounded-full",
    icon: "w-9 h-9 rounded-full bg-white/15",
  },
  fund: {
    shell: "border border-white/10 bg-zinc-950/90 text-slate-100 shadow-[0_12px_35px_rgba(0,0,0,0.25)]",
    content: "px-4 py-3 rounded-2xl",
    icon: "w-9 h-9 rounded-xl bg-white/10",
  },
  sector: {
    shell: "border border-fuchsia-400/25 bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white",
    content: "px-4 py-2.5 rounded-full",
    icon: "w-8 h-8 rounded-full bg-white/15",
  },
  company: {
    shell: "border border-white/10 bg-white/90 text-slate-900 shadow-[0_8px_24px_rgba(255,255,255,0.08)]",
    content: "px-3.5 py-2 rounded-full",
    icon: "w-7 h-7 rounded-full bg-slate-900/10",
  },
  macro: {
    shell: "border border-amber-300/25 bg-gradient-to-r from-amber-500 to-orange-600 text-white",
    content: "px-4 py-2.5 rounded-full",
    icon: "w-8 h-8 rounded-full bg-white/15",
  },
};

export default function GraphNode({ data }) {
  const label = data.label ?? data.name ?? "Node";
  const isMuted = Boolean(data.isMuted);
  const style = styles[data.type] ?? styles.company;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: isMuted ? 0.35 : 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 0 1px rgba(96,165,250,0.4), 0 0 24px rgba(59,130,246,0.25)" }}
      transition={{ duration: 0.2, delay: 0.02 }}
      onMouseEnter={data.onHover}
      onMouseLeave={data.onLeave}
      className={`
        ${style.shell}
        ${style.content}
        cursor-pointer
        flex
        items-center
        gap-3
        transition-all
        duration-200
        relative
        z-10
      `}
    >
      {data.logo ? (
        <div className={`flex items-center justify-center ${style.icon}`}>
          <img src={data.logo} alt={label} className="h-6 w-6 rounded-full object-cover" />
        </div>
      ) : (
        <div className={`flex items-center justify-center ${style.icon}`}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            {data.type?.[0] ?? "N"}
          </span>
        </div>
      )}

      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-none">{label}</span>
        {data.type === "fund" && data.category ? (
          <span className="mt-1 text-[11px] text-slate-400">{data.category}</span>
        ) : null}
      </div>
    </motion.div>
  );
}