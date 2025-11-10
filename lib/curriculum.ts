// CFA Level 1 Curriculum Structure based on 2025/2026 Learning Objectives
// Total: 180 questions across 10 main topics

export interface Subtopic {
  id: string;
  name: string;
  learningOutcomes: number; // Number of learning outcomes
}

export interface Topic {
  id: string;
  name: string;
  examWeight: string;
  questionCount: number;
  icon: string;
  color: string;
  description: string;
  subtopics: Subtopic[];
}

export const cfaLevel1Curriculum: Topic[] = [
  {
    id: "ethical-professional-standards",
    name: "Ethical and Professional Standards",
    examWeight: "15-20%",
    questionCount: 320,
    icon: "⚖️",
    color: "bg-yellow-500",
    description: "Ethics, professional standards, and GIPS",
    subtopics: [
      { id: "ethics-trust", name: "Ethics and Trust in the Investment Profession", learningOutcomes: 8 },
      { id: "code-standards", name: "Code of Ethics and Standards of Professional Conduct", learningOutcomes: 3 },
      { id: "guidance-standards", name: "Guidance for Standards I–VII", learningOutcomes: 3 },
      { id: "gips-intro", name: "Introduction to the Global Investment Performance Standards (GIPS)", learningOutcomes: 5 },
      { id: "ethics-application", name: "Ethics Application", learningOutcomes: 2 }
    ]
  },
  {
    id: "quantitative-methods",
    name: "Quantitative Methods",
    examWeight: "6-9%",
    questionCount: 140,
    icon: "📊",
    color: "bg-blue-500",
    description: "Statistics, probability, and quantitative analysis",
    subtopics: [
      { id: "rates-returns", name: "Rates and Returns", learningOutcomes: 5 },
      { id: "time-value-money", name: "Time Value of Money in Finance", learningOutcomes: 3 },
      { id: "statistical-measures", name: "Statistical Measures of Asset Returns", learningOutcomes: 4 },
      { id: "probability-trees", name: "Probability Trees and Conditional Expectations", learningOutcomes: 3 },
      { id: "portfolio-mathematics", name: "Portfolio Mathematics", learningOutcomes: 3 },
      { id: "simulation-methods", name: "Simulation Methods", learningOutcomes: 3 },
      { id: "estimation-inference", name: "Estimation and Inference", learningOutcomes: 3 },
      { id: "hypothesis-testing", name: "Hypothesis Testing", learningOutcomes: 3 },
      { id: "parametric-tests", name: "Parametric and Non-Parametric Tests of Independence", learningOutcomes: 2 },
      { id: "simple-regression", name: "Simple Linear Regression", learningOutcomes: 6 },
      { id: "big-data", name: "Introduction to Big Data Techniques", learningOutcomes: 3 }
    ]
  },
  {
    id: "economics",
    name: "Economics",
    examWeight: "6-9%",
    questionCount: 140,
    icon: "🌍",
    color: "bg-green-500",
    description: "Micro and macroeconomics, international trade",
    subtopics: [
      { id: "firm-market-structures", name: "The Firm and Market Structures", learningOutcomes: 5 },
      { id: "business-cycles", name: "Understanding Business Cycles", learningOutcomes: 3 },
      { id: "fiscal-policy", name: "Fiscal Policy", learningOutcomes: 4 },
      { id: "monetary-policy", name: "Monetary Policy", learningOutcomes: 4 },
      { id: "geopolitics", name: "Introduction to Geopolitics", learningOutcomes: 6 },
      { id: "international-trade", name: "International Trade", learningOutcomes: 3 },
      { id: "capital-flows-fx", name: "Capital Flows and the FX Market", learningOutcomes: 3 },
      { id: "exchange-rates", name: "Exchange Rate Calculations", learningOutcomes: 2 }
    ]
  },
  {
    id: "financial-statement-analysis",
    name: "Financial Statement Analysis",
    examWeight: "11-14%",
    questionCount: 230,
    icon: "📋",
    color: "bg-purple-500",
    description: "Financial reporting, analysis, and interpretation",
    subtopics: [
      { id: "fsa-intro", name: "Introduction to Financial Statement Analysis", learningOutcomes: 5 },
      { id: "income-statements", name: "Analyzing Income Statements", learningOutcomes: 5 },
      { id: "balance-sheets", name: "Analyzing Balance Sheets", learningOutcomes: 5 },
      { id: "cash-flows-1", name: "Analyzing Statements of Cash Flows I", learningOutcomes: 4 },
      { id: "cash-flows-2", name: "Analyzing Statements of Cash Flows II", learningOutcomes: 2 },
      { id: "inventories", name: "Analysis of Inventories", learningOutcomes: 3 },
      { id: "long-term-assets", name: "Analysis of Long-Term Assets", learningOutcomes: 3 },
      { id: "liabilities-equity", name: "Topics in Long-Term Liabilities and Equity", learningOutcomes: 3 },
      { id: "income-taxes", name: "Analysis of Income Taxes", learningOutcomes: 4 },
      { id: "reporting-quality", name: "Financial Reporting Quality", learningOutcomes: 8 },
      { id: "analysis-techniques", name: "Financial Analysis Techniques", learningOutcomes: 6 },
      { id: "fs-modeling", name: "Introduction to Financial Statement Modeling", learningOutcomes: 5 }
    ]
  },
  {
    id: "corporate-issuers",
    name: "Corporate Issuers",
    examWeight: "6-9%",
    questionCount: 140,
    icon: "🏢",
    color: "bg-gray-500",
    description: "Corporate governance, capital structure, investments",
    subtopics: [
      { id: "organizational-forms", name: "Organizational Forms, Corporate Issuer Features, and Ownership", learningOutcomes: 3 },
      { id: "stakeholders", name: "Investors and Other Stakeholders", learningOutcomes: 3 },
      { id: "corporate-governance", name: "Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits", learningOutcomes: 3 },
      { id: "working-capital", name: "Working Capital and Liquidity", learningOutcomes: 3 },
      { id: "capital-investments", name: "Capital Investments and Capital Allocation", learningOutcomes: 4 },
      { id: "capital-structure", name: "Capital Structure", learningOutcomes: 4 },
      { id: "business-models", name: "Business Models", learningOutcomes: 2 }
    ]
  },
  {
    id: "equity-investments",
    name: "Equity Investments",
    examWeight: "11-14%",
    questionCount: 230,
    icon: "📈",
    color: "bg-red-500",
    description: "Equity securities, markets, and valuation",
    subtopics: [
      { id: "market-organization", name: "Market Organization and Structure", learningOutcomes: 12 },
      { id: "market-indexes", name: "Security Market Indexes", learningOutcomes: 10 },
      { id: "market-efficiency", name: "Market Efficiency", learningOutcomes: 7 },
      { id: "equity-securities", name: "Overview of Equity Securities", learningOutcomes: 8 },
      { id: "company-analysis-present", name: "Company Analysis: Past and Present", learningOutcomes: 5 },
      { id: "industry-analysis", name: "Industry and Competitive Analysis", learningOutcomes: 5 },
      { id: "company-forecasting", name: "Company Analysis: Forecasting", learningOutcomes: 5 },
      { id: "equity-valuation", name: "Equity Valuation: Concepts and Basic Tools", learningOutcomes: 13 }
    ]
  },
  {
    id: "fixed-income",
    name: "Fixed Income",
    examWeight: "11-14%",
    questionCount: 230,
    icon: "🏦",
    color: "bg-indigo-500",
    description: "Bonds, fixed-income securities, and credit analysis",
    subtopics: [
      { id: "fi-features", name: "Fixed-Income Instrument Features", learningOutcomes: 2 },
      { id: "fi-cash-flows", name: "Fixed-Income Cash Flows and Types", learningOutcomes: 2 },
      { id: "fi-issuance", name: "Fixed-Income Issuance and Trading", learningOutcomes: 3 },
      { id: "fi-corporate", name: "Fixed-Income Markets for Corporate Issuers", learningOutcomes: 3 },
      { id: "fi-government", name: "Fixed-Income Markets for Government Issuers", learningOutcomes: 2 },
      { id: "bond-valuation", name: "Fixed-Income Bond Valuation: Prices and Yields", learningOutcomes: 3 },
      { id: "yield-measures-fixed", name: "Yield and Yield Spread Measures for Fixed-Rate Bonds", learningOutcomes: 2 },
      { id: "yield-measures-floating", name: "Yield and Yield Spread Measures for Floating-Rate Instruments", learningOutcomes: 2 },
      { id: "term-structure", name: "The Term Structure of Interest Rates: Spot, Par, and Forward Curves", learningOutcomes: 3 },
      { id: "interest-rate-risk", name: "Interest Rate Risk and Return", learningOutcomes: 3 },
      { id: "duration-measures", name: "Yield-Based Bond Duration Measures and Properties", learningOutcomes: 2 },
      { id: "convexity", name: "Yield-Based Bond Convexity and Portfolio Properties", learningOutcomes: 3 },
      { id: "curve-risk-measures", name: "Curve-Based and Empirical Fixed-Income Risk Measures", learningOutcomes: 4 },
      { id: "credit-risk", name: "Credit Risk", learningOutcomes: 3 },
      { id: "credit-government", name: "Credit Analysis for Government Issuers", learningOutcomes: 1 },
      { id: "credit-corporate", name: "Credit Analysis for Corporate Issuers", learningOutcomes: 3 },
      { id: "securitization", name: "Fixed-Income Securitization", learningOutcomes: 2 },
      { id: "abs", name: "Asset-Backed Security (ABS) Instrument and Market Features", learningOutcomes: 4 },
      { id: "mbs", name: "Mortgage-Backed Security (MBS) Instrument and Market Features", learningOutcomes: 4 }
    ]
  },
  {
    id: "derivatives",
    name: "Derivatives",
    examWeight: "5-8%",
    questionCount: 108,
    icon: "🔄",
    color: "bg-pink-500",
    description: "Forwards, futures, options, and swaps",
    subtopics: [
      { id: "derivative-features", name: "Derivative Instrument and Derivative Market Features", learningOutcomes: 2 },
      { id: "forward-contingent", name: "Forward Commitment and Contingent Claim Features and Instruments", learningOutcomes: 3 },
      { id: "derivative-benefits", name: "Derivative Benefits, Risks, and Issuer and Investor Uses", learningOutcomes: 2 },
      { id: "arbitrage-replication", name: "Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives", learningOutcomes: 2 },
      { id: "forward-pricing", name: "Pricing and Valuation of Forward Contracts and for an Underlying with Varying Maturities", learningOutcomes: 2 },
      { id: "futures-pricing", name: "Pricing and Valuation of Futures Contracts", learningOutcomes: 2 },
      { id: "swaps-pricing", name: "Pricing and Valuation of Interest Rates and Other Swaps", learningOutcomes: 2 },
      { id: "options-pricing", name: "Pricing and Valuation of Options", learningOutcomes: 3 },
      { id: "put-call-parity", name: "Option Replication Using Put–Call Parity", learningOutcomes: 2 },
      { id: "binomial-model", name: "Valuing a Derivative Using a One-Period Binomial Model", learningOutcomes: 2 }
    ]
  },
  {
    id: "alternative-investments",
    name: "Alternative Investments",
    examWeight: "7-10%",
    questionCount: 162,
    icon: "🏗️",
    color: "bg-orange-500",
    description: "Private equity, real estate, hedge funds, commodities",
    subtopics: [
      { id: "alt-features", name: "Alternative Investment Features, Methods, and Structures", learningOutcomes: 3 },
      { id: "alt-performance", name: "Alternative Investment Performance and Returns", learningOutcomes: 2 },
      { id: "private-capital", name: "Investments in Private Capital: Equity and Debt", learningOutcomes: 3 },
      { id: "real-estate-infrastructure", name: "Real Estate and Infrastructure", learningOutcomes: 4 },
      { id: "natural-resources", name: "Natural Resources", learningOutcomes: 3 },
      { id: "hedge-funds", name: "Hedge Funds", learningOutcomes: 3 },
      { id: "digital-assets", name: "Introduction to Digital Assets", learningOutcomes: 4 }
    ]
  },
  {
    id: "portfolio-management",
    name: "Portfolio Management",
    examWeight: "8-12%",
    questionCount: 180,
    icon: "💼",
    color: "bg-teal-500",
    description: "Portfolio theory, CAPM, and risk management",
    subtopics: [
      { id: "portfolio-risk-return-1", name: "Portfolio Risk and Return: Part I", learningOutcomes: 7 },
      { id: "portfolio-risk-return-2", name: "Portfolio Risk and Return: Part II", learningOutcomes: 9 },
      { id: "pm-overview", name: "Portfolio Management: An Overview", learningOutcomes: 6 },
      { id: "portfolio-planning", name: "Basics of Portfolio Planning and Construction", learningOutcomes: 8 },
      { id: "behavioral-biases", name: "The Behavioral Biases of Individuals", learningOutcomes: 3 },
      { id: "risk-management", name: "Introduction to Risk Management", learningOutcomes: 7 }
    ]
  }
];

// Helper function to get total number of subtopics
export const getTotalSubtopics = (): number => {
  return cfaLevel1Curriculum.reduce((sum, topic) => sum + topic.subtopics.length, 0);
};

// Helper function to get total learning outcomes
export const getTotalLearningOutcomes = (): number => {
  return cfaLevel1Curriculum.reduce((sum, topic) =>
    sum + topic.subtopics.reduce((subSum, subtopic) => subSum + subtopic.learningOutcomes, 0), 0
  );
};

// Helper function to get topic by ID
export const getTopicById = (topicId: string): Topic | undefined => {
  return cfaLevel1Curriculum.find(topic => topic.id === topicId);
};

// Helper function to get subtopic by IDs
export const getSubtopicById = (topicId: string, subtopicId: string): Subtopic | undefined => {
  const topic = getTopicById(topicId);
  return topic?.subtopics.find(subtopic => subtopic.id === subtopicId);
};
