import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { graph } from "../data/graph";

function getParentId(nodeId) {
  for (const [parentId, node] of Object.entries(graph)) {
    if (node.children.includes(nodeId)) {
      return parentId;
    }
  }

  return null;
}

function getContextData(nodeId) {
  const node = graph[nodeId] ?? graph.portfolio;

  switch (node.type) {
    case "fund":
      return {
        title: node.label,
        subtitle: "Fund Insight",
        rows: [
          { label: "Category", value: node.category ?? "Large & Mid Cap" },
          { label: "Expense Ratio", value: "0.58%" },
          { label: "Risk", value: "Moderate" },
          { label: "AUM", value: "₹18,420 Cr" },
          { label: "Top Holdings", value: "HDFC Bank, ICICI Bank, Infosys" },
          { label: "Top Sectors", value: "Financials, Tech, Consumer" },
        ],
        insight: node.id === "hdfc"
          ? "This fund improves diversification because of its broad market allocation across large-cap leaders and quality mid-caps."
          : node.id === "quant"
            ? "The strategy leans into smaller businesses with higher growth potential, which can increase upside but also volatility."
            : "This allocation offers a stable core exposure with strong participation in established blue-chip companies.",
      };
    case "sector":
      return {
        title: node.label,
        subtitle: "Sector Monitor",
        rows: [
          { label: "Weight", value: "31%" },
          { label: "Trend", value: "Positive" },
          { label: "Companies", value: "HDFC Bank, Infosys, TCS" },
        ],
        insight: node.id === "financials"
          ? "Financials currently represent 31% of the portfolio. High exposure increases sensitivity to interest-rate changes."
          : node.id === "technology"
            ? "Technology is positively correlated with AI infrastructure demand and enterprise digitisation trends."
            : "This sector is benefiting from a steady domestic consumption backdrop and improving earnings visibility.",
      };
    case "company":
      return {
        title: node.label,
        subtitle: "Company Profile",
        rows: [
          { label: "Sector", value: node.label.includes("Bank") ? "Banking" : "Technology" },
          { label: "Appears In Funds", value: "2 funds" },
          { label: "Market Cap", value: "₹14.2 L Cr" },
          { label: "Risk Contribution", value: "Medium" },
        ],
        insight: node.id === "hdfcbank"
          ? "HDFC Bank remains a core quality holding with strong balance-sheet resilience and steady earnings growth."
          : node.id === "infosys"
            ? "Infosys stands to benefit from sustained IT services demand and margin discipline."
            : "This company adds stability and liquidity to the broader portfolio mix.",
      };
    case "macro":
      return {
        title: node.label,
        subtitle: "Macro Context",
        rows: [
          { label: "Description", value: "Rate sensitivity and liquidity cycle" },
          { label: "Current Trend", value: "Stable with upside bias" },
          { label: "Impacted Sectors", value: "Financials, Industrials, Tech" },
        ],
        insight: "Macro conditions are shaping valuation multiples and sector leadership, especially in interest-rate sensitive names.",
      };
    default:
      return {
        title: node.label,
        subtitle: "Portfolio Overview",
        rows: [
          { label: "Focus", value: "Balanced growth allocation" },
          { label: "Momentum", value: "Positive" },
          { label: "Depth", value: "Multi-layer exploration" },
        ],
        insight: "The portfolio is positioned to balance growth, stability and diversification across multiple themes.",
      };
  }
}

export default function PortfolioGraph() {
  const [activeNodeId, setActiveNodeId] = useState("portfolio");
  const [hoveredBranch, setHoveredBranch] = useState("portfolio");

  const contextData = getContextData(activeNodeId);

  const rootNode = graph.portfolio;
  const children = rootNode.children.map((childId) => graph[childId]).filter(Boolean);

  const getChildren = (nodeId) => {
    const node = graph[nodeId];
    return (node?.children ?? []).map((childId) => graph[childId]).filter(Boolean);
  };

  const activeChildren = getChildren(activeNodeId);
  const branchChildren = hoveredBranch === "portfolio" ? children : getChildren(hoveredBranch);

  const getAccent = (node) => {
    if (node.type === "portfolio") return "from-sky-500/30 via-blue-600/15 to-cyan-400/10";
    if (node.id === "hdfc") return "from-emerald-500/30 via-lime-400/15 to-cyan-400/10";
    if (node.id === "quant") return "from-fuchsia-500/30 via-violet-500/15 to-purple-400/10";
    if (node.id === "icici") return "from-amber-500/30 via-orange-400/15 to-rose-400/10";
    if (node.type === "sector") return "from-violet-500/30 via-fuchsia-400/15 to-sky-400/10";
    if (node.type === "company") return "from-slate-200/20 via-slate-100/10 to-slate-50/5";
    return "from-amber-500/25 via-orange-400/15 to-rose-400/10";
  };

  const getRiskTone = (node) => {
    if (node.id === "quant") return "border-red-400/30 bg-red-500/10 text-red-300";
    if (node.id === "icici") return "border-amber-400/30 bg-amber-500/10 text-amber-300";
    return "border-emerald-400/30 bg-emerald-500/10 text-emerald-300";
  };

  const getReturnTone = (value) => {
    if (value > 0) return "text-emerald-300";
    return "text-rose-300";
  };

  const cardStyle = "rounded-[28px] border border-white/10 bg-[rgba(20,24,32,0.75)] shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-all duration-250";
  const backgroundParticles = [
    { id: 1, left: "18%", top: "24%", size: 3 },
    { id: 2, left: "74%", top: "18%", size: 2.5 },
    { id: 3, left: "32%", top: "72%", size: 2 },
    { id: 4, left: "82%", top: "66%", size: 2.8 },
    { id: 5, left: "58%", top: "36%", size: 1.8 },
  ];

  const renderNodeVisual = (node, isActive = false, isExpanded = false) => {
    const accentGlow = isActive || isExpanded ? "shadow-[0_0_24px_rgba(56,189,248,0.24)]" : "shadow-[0_10px_30px_rgba(0,0,0,0.24)]";

    if (node.type === "portfolio") {
      return (
        <motion.div
          animate={{ scale: isActive || isExpanded ? 1.1 : 1, rotate: isActive || isExpanded ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-sky-400/25 bg-gradient-to-br from-sky-500/25 to-cyan-400/20 ${accentGlow}`}
        >
          <svg viewBox="0 0 64 64" className="h-7 w-7 text-sky-300">
            <path d="M32 6 48 14 48 34 32 42 16 34 16 14 32 6Z" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M24 24h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M28 30h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>
      );
    }

    if (node.type === "fund") {
      return (
        <motion.div
          animate={{ scale: isActive || isExpanded ? 1.1 : 1, rotate: isActive || isExpanded ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-white/10 ${accentGlow}`}
        >
          <img src={node.logo} alt={node.label} className="h-full w-full object-cover" />
        </motion.div>
      );
    }

    if (node.type === "sector") {
      const sectorAccent = node.id === "financials"
        ? "from-amber-500/25 to-rose-500/20 text-amber-300"
        : node.id === "technology"
          ? "from-violet-500/25 to-sky-500/20 text-violet-200"
          : "from-emerald-500/25 to-cyan-500/20 text-emerald-200";

      return (
        <motion.div
          animate={{ scale: isActive || isExpanded ? 1.1 : 1, rotate: isActive || isExpanded ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-gradient-to-br ${sectorAccent} ${accentGlow}`}
        >
          <svg viewBox="0 0 64 64" className="h-7 w-7">
            <path d="M18 16h28l-8 32H26l-8-32Z" fill="currentColor" fillOpacity="0.9" />
          </svg>
        </motion.div>
      );
    }

    if (node.type === "company") {
      const initials = (node.label || "CO")
        .split(" ")
        .map((part) => part[0] ?? "")
        .join("")
        .slice(0, 2)
        .toUpperCase();

      return (
        <motion.div
          animate={{ scale: isActive || isExpanded ? 1.1 : 1, rotate: isActive || isExpanded ? 3 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-gradient-to-br from-slate-200/20 to-slate-500/20 text-sm font-bold tracking-[0.24em] text-white ${accentGlow}`}
        >
          {initials}
        </motion.div>
      );
    }

    return (
      <motion.div
        animate={{ scale: isActive || isExpanded ? 1.1 : 1, rotate: isActive || isExpanded ? 3 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-gradient-to-br from-cyan-400/30 via-sky-400/20 to-indigo-400/20 ${accentGlow}`}
      >
        <div className="h-5 w-5 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(125,211,252,0.8)]" />
      </motion.div>
    );
  };

  const renderCard = (node, index = 0, isActive = false, depth = 0, revealStage = 0) => {
    const isLeaf = !node.children?.length;
    const isExpanded = activeNodeId === node.id || hoveredBranch === node.id;
    const accent = getAccent(node);
    const riskTone = node.type === "fund" ? getRiskTone(node) : "border-white/10 bg-white/5 text-slate-300";

    return (
      <motion.button
        key={node.id}
        type="button"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{
          opacity: isActive || isExpanded ? 1 : 0.7,
          y: 0,
          scale: isActive ? 1.02 : 1,
          x: 0,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 24, delay: depth === 0 ? 0.02 : 0.12 + index * 0.04 + revealStage * 0.08 }}
        whileHover={{ scale: 1.03, y: -6, boxShadow: "0 24px 48px rgba(56,189,248,0.22)" }}
        onMouseEnter={() => {
          setHoveredBranch(node.id);
          setActiveNodeId(node.id);
        }}
        className={`relative overflow-hidden text-left text-slate-100 ${cardStyle} ${isActive ? "border-sky-400/40 shadow-[0_28px_90px_rgba(56,189,248,0.18)]" : ""}`}
        style={{
          width: depth === 0 ? 360 : depth === 1 ? 260 : 220,
          minHeight: depth === 0 ? 220 : depth === 1 ? 150 : 128,
          padding: depth === 0 ? "32px 34px" : depth === 1 ? "24px 24px" : "20px 20px",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_45%)]" />
        <div className="absolute inset-px rounded-[27px] border border-white/10 bg-[rgba(13,17,23,0.9)]" />
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: depth === 0 ? 0.04 : 0.16 + revealStage * 0.08 }}
          className="flex items-start justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            {renderNodeVisual(node, isActive, isExpanded)}
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-500/80">{node.type}</p>
              <p className="mt-1 text-lg font-bold text-white">{node.label}</p>
            </div>
          </div>
          {node.type === "fund" ? (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 + revealStage * 0.08 }}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.28em] ${riskTone}`}
            >
              {node.risk ?? "Moderate"}
            </motion.span>
          ) : null}
        </motion.div>

        {depth === 0 ? (
          <div className="mt-8 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + revealStage * 0.08 }}
              className="space-y-1"
            >
              <p className="text-[10px] uppercase tracking-[0.38em] text-slate-500/80">Portfolio</p>
              <p className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">₹12,000</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + revealStage * 0.08 }}
              className="flex items-end justify-between border-t border-white/10 pt-4"
            >
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + revealStage * 0.08 }}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Health</p>
                <p className="mt-1 text-2xl font-extrabold text-white">92/100</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 + revealStage * 0.08 }} className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Funds</p>
                <p className="mt-1 text-2xl font-extrabold text-white">3</p>
              </motion.div>
            </motion.div>
          </div>
        ) : depth === 1 ? (
          <div className="mt-6 flex items-end justify-between rounded-2xl border border-white/10 bg-black/20 px-3.5 py-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 + revealStage * 0.08 }}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Today</p>
              <p className={`mt-1 text-xl font-extrabold ${getReturnTone(1.84)}`}>+1.84%</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + revealStage * 0.08 }} className="text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Risk</p>
              <p className="mt-1 text-sm font-semibold text-slate-300">Balanced</p>
            </motion.div>
          </div>
        ) : depth === 2 ? (
          <div className="mt-6 space-y-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3.5 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Weight</p>
              <p className="mt-1 text-base font-extrabold text-white">18.4%</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3.5 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Risk</p>
              <p className="mt-1 text-base font-extrabold text-white">Medium</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3.5 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Market Cap</p>
              <p className="mt-1 text-base font-extrabold text-white">₹14.2 L Cr</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3.5 py-2.5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500/80">Appears In</p>
              <p className="mt-1 text-base font-extrabold text-white">2 funds</p>
            </div>
          </div>
        )}

        {!isLeaf && isExpanded ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {(depth === 0 ? children : depth === 1 ? activeChildren : getChildren(node.id)).map((child, childIndex) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: childIndex * 0.05 }}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300"
              >
                {child.label}
              </motion.div>
            ))}
          </div>
        ) : null}
        </div>
      </motion.button>
    );
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#05070b] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(56,189,248,0.08),transparent_58%)]" />
        <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle,rgba(255,255,255,0.16)_0.8px,transparent_0.8px)] [background-size:18px_18px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,8,23,0.35),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(2,8,23,0.45),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.72)_100%)]" />
        <div className="absolute left-1/2 top-[20%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_72%)] blur-3xl" />
        {backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.01, y: 0, x: 0 }}
            animate={{ opacity: [0.01, 0.02, 0.01], y: [0, -3, 0], x: [0, 1, 0] }}
            transition={{ duration: 10 + particle.id, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full bg-white/80"
            style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          />
        ))}
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-black/25 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div />
          <div />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center overflow-hidden pt-20">
        <div className="relative flex w-full max-w-6xl items-center justify-center px-6 py-8">
          <motion.div
            layout
            className="relative flex flex-col items-center gap-5"
            onMouseLeave={() => {
              setHoveredBranch("portfolio");
              setActiveNodeId("portfolio");
            }}
          >
            <AnimatePresence mode="wait">
              {renderCard(rootNode, 0, true, 0, 0)}
            </AnimatePresence>

            <motion.div
              layout
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {branchChildren.map((child, index) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.12 + index * 0.08 }}
                  className="flex justify-center"
                >
                  {renderCard(child, index, activeNodeId === child.id, 1, 1)}
                </motion.div>
              ))}
            </motion.div>

            <AnimatePresence>
              {activeNodeId !== "portfolio" && activeNodeId !== "macro" && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  {activeChildren.map((child, index) => (
                    <motion.div
                      key={child.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {renderCard(child, index, false, 2, 2)}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {activeNodeId === "hdfcbank" && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.2 }}
                  className="w-full rounded-[30px] border border-white/10 bg-[#11151d]/95 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.38em] text-slate-500/70">Deep dive</p>
                      <h2 className="mt-1 text-xl font-bold text-white">{contextData.title}</h2>
                    </div>
                    <span className="rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-sky-300">
                      Active view
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {contextData.rows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500/70">{row.label}</p>
                        <p className="mt-1 text-base font-extrabold text-slate-100">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm leading-6 text-slate-200">
                    {contextData.insight}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}