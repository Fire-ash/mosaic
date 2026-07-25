export const graph = {
  portfolio: {
    id: "portfolio",
    label: "Portfolio",
    type: "portfolio",
    children: ["hdfc", "quant", "icici"],
  },

  hdfc: {
    id: "hdfc",
    label: "HDFC Flexi Cap",
    type: "fund",
    logo: "/logos/hdfc.png",
    children: ["financials", "technology", "consumer"],
  },

  quant: {
    id: "quant",
    label: "Quant Small Cap",
    type: "fund",
    logo: "/logos/quant.jpeg",
    children: ["manufacturing", "energy"],
  },

  icici: {
    id: "icici",
    label: "ICICI Bluechip",
    type: "fund",
    logo: "/logos/icici.png",
    children: ["banking", "it"],
  },

  financials: {
    id: "financials",
    label: "Financials",
    type: "sector",
    children: ["hdfcbank", "icicibank"],
  },

  technology: {
    id: "technology",
    label: "Technology",
    type: "sector",
    children: ["infosys", "tcs"],
  },

  consumer: {
    id: "consumer",
    label: "Consumer",
    type: "sector",
    children: [],
  },

  manufacturing: {
    id: "manufacturing",
    label: "Manufacturing",
    type: "sector",
    children: [],
  },

  energy: {
    id: "energy",
    label: "Energy",
    type: "sector",
    children: [],
  },

  banking: {
    id: "banking",
    label: "Banking",
    type: "sector",
    children: [],
  },

  it: {
    id: "it",
    label: "IT",
    type: "sector",
    children: [],
  },

  hdfcbank: {
    id: "hdfcbank",
    label: "HDFC Bank",
    type: "company",
    children: ["macro"],
  },

  icicibank: {
    id: "icicibank",
    label: "ICICI Bank",
    type: "company",
    children: ["macro"],
  },

  infosys: {
    id: "infosys",
    label: "Infosys",
    type: "company",
    children: ["macro"],
  },

  tcs: {
    id: "tcs",
    label: "TCS",
    type: "company",
    children: ["macro"],
  },

  macro: {
    id: "macro",
    label: "Macro Factors",
    type: "macro",
    children: [],
  },
};