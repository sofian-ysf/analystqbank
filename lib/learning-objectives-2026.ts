/**
 * CFA Level 1 2026 Learning Objectives
 *
 * Structured data for all learning outcomes organized by topic and reading
 */

export interface LearningObjective {
  id: string;
  text: string;
  reading: string;
}

export interface Reading {
  name: string;
  learningObjectives: LearningObjective[];
}

export interface TopicLearningObjectives {
  topicName: string;
  readings: Reading[];
}

export const CFA_2026_LEARNING_OBJECTIVES: TopicLearningObjectives[] = [
  {
    topicName: 'Quantitative Methods',
    readings: [
      {
        name: 'Rates and Returns',
        learningObjectives: [
          { id: 'QM-RR-1', reading: 'Rates and Returns', text: 'interpret interest rates as required rates of return, discount rates, or opportunity costs and explain an interest rate as the sum of a real risk-free rate and premiums that compensate investors for bearing distinct types of risk' },
          { id: 'QM-RR-2', reading: 'Rates and Returns', text: 'calculate and interpret different approaches to return measurement over time and describe their appropriate uses' },
          { id: 'QM-RR-3', reading: 'Rates and Returns', text: 'compare the money-weighted and time-weighted rates of return and evaluate the performance of portfolios based on these measures' },
          { id: 'QM-RR-4', reading: 'Rates and Returns', text: 'calculate and interpret annualized return measures and continuously compounded returns, and describe their appropriate uses' },
          { id: 'QM-RR-5', reading: 'Rates and Returns', text: 'calculate and interpret major return measures and describe their appropriate uses' },
        ]
      },
      {
        name: 'Time Value of Money in Finance',
        learningObjectives: [
          { id: 'QM-TVM-1', reading: 'Time Value of Money in Finance', text: 'calculate and interpret the present value (PV) of fixed-income and equity instruments based on expected future cash flows' },
          { id: 'QM-TVM-2', reading: 'Time Value of Money in Finance', text: 'calculate and interpret the implied return of fixed-income instruments and required return and implied growth of equity instruments given the present value (PV) and cash flows' },
          { id: 'QM-TVM-3', reading: 'Time Value of Money in Finance', text: 'explain the cash flow additivity principle, its importance for the no-arbitrage condition, and its use in calculating implied forward interest rates, forward exchange rates, and option values' },
        ]
      },
      {
        name: 'Statistical Measures of Asset Returns',
        learningObjectives: [
          { id: 'QM-SMAR-1', reading: 'Statistical Measures of Asset Returns', text: 'calculate, interpret, and evaluate measures of central tendency and location to address an investment problem' },
          { id: 'QM-SMAR-2', reading: 'Statistical Measures of Asset Returns', text: 'calculate, interpret, and evaluate measures of dispersion to address an investment problem' },
          { id: 'QM-SMAR-3', reading: 'Statistical Measures of Asset Returns', text: 'interpret and evaluate measures of skewness and kurtosis to address an investment problem' },
          { id: 'QM-SMAR-4', reading: 'Statistical Measures of Asset Returns', text: 'interpret correlation between two variables to address an investment problem' },
        ]
      },
      {
        name: 'Probability Trees and Conditional Expectations',
        learningObjectives: [
          { id: 'QM-PTCE-1', reading: 'Probability Trees and Conditional Expectations', text: 'calculate expected values, variances, and standard deviations and demonstrate their application to investment problems' },
          { id: 'QM-PTCE-2', reading: 'Probability Trees and Conditional Expectations', text: 'formulate an investment problem as a probability tree and explain the use of conditional expectations in investment application' },
          { id: 'QM-PTCE-3', reading: 'Probability Trees and Conditional Expectations', text: "calculate and interpret an updated probability in an investment setting using Bayes' formula" },
        ]
      },
      {
        name: 'Portfolio Mathematics',
        learningObjectives: [
          { id: 'QM-PM-1', reading: 'Portfolio Mathematics', text: 'calculate and interpret the expected value, variance, standard deviation, covariances, and correlations of portfolio returns' },
          { id: 'QM-PM-2', reading: 'Portfolio Mathematics', text: 'calculate and interpret the covariance and correlation of portfolio returns using a joint probability function for returns' },
          { id: 'QM-PM-3', reading: 'Portfolio Mathematics', text: "define shortfall risk, calculate the safety-first ratio, and identify an optimal portfolio using Roy's safety-first criterion" },
        ]
      },
      {
        name: 'Simulation Methods',
        learningObjectives: [
          { id: 'QM-SM-1', reading: 'Simulation Methods', text: 'explain the relationship between normal and lognormal distributions and why the lognormal distribution is used to model asset prices when using continuously compounded asset returns' },
          { id: 'QM-SM-2', reading: 'Simulation Methods', text: 'describe Monte Carlo simulation and explain how it can be used in investment applications' },
          { id: 'QM-SM-3', reading: 'Simulation Methods', text: 'describe the use of bootstrap resampling in conducting a simulation based on observed data in investment applications' },
        ]
      },
      {
        name: 'Estimation and Inference',
        learningObjectives: [
          { id: 'QM-EI-1', reading: 'Estimation and Inference', text: 'compare and contrast simple random, stratified random, cluster, convenience, and judgmental sampling and their implications for sampling error in an investment problem' },
          { id: 'QM-EI-2', reading: 'Estimation and Inference', text: 'explain the central limit theorem and its importance for the distribution and standard error of the sample mean' },
          { id: 'QM-EI-3', reading: 'Estimation and Inference', text: 'describe the use of resampling (bootstrap, jackknife) to estimate the sampling distribution of a statistic' },
        ]
      },
      {
        name: 'Hypothesis Testing',
        learningObjectives: [
          { id: 'QM-HT-1', reading: 'Hypothesis Testing', text: 'explain hypothesis testing and its components, including statistical significance, Type I and Type II errors, and the power of a test' },
          { id: 'QM-HT-2', reading: 'Hypothesis Testing', text: 'construct hypothesis tests and determine their statistical significance, the associated Type I and Type II errors, and power of the test given a significance level' },
          { id: 'QM-HT-3', reading: 'Hypothesis Testing', text: 'compare and contrast parametric and nonparametric tests, and describe situations where each is the more appropriate type of test' },
        ]
      },
      {
        name: 'Parametric and Non-Parametric Tests of Independence',
        learningObjectives: [
          { id: 'QM-PNPTI-1', reading: 'Parametric and Non-Parametric Tests of Independence', text: 'explain parametric and nonparametric tests of the hypothesis that the population correlation coefficient equals zero, and determine whether the hypothesis is rejected at a given level of significance' },
          { id: 'QM-PNPTI-2', reading: 'Parametric and Non-Parametric Tests of Independence', text: 'explain tests of independence based on contingency table data' },
        ]
      },
      {
        name: 'Simple Linear Regression',
        learningObjectives: [
          { id: 'QM-SLR-1', reading: 'Simple Linear Regression', text: 'describe a simple linear regression model, how the least squares criterion is used to estimate regression coefficients, and the interpretation of these coefficients' },
          { id: 'QM-SLR-2', reading: 'Simple Linear Regression', text: 'explain the assumptions underlying the simple linear regression model, and describe how residuals and residual plots indicate if these assumptions may have been violated' },
          { id: 'QM-SLR-3', reading: 'Simple Linear Regression', text: 'calculate and interpret measures of fit and formulate and evaluate tests of fit and of regression coefficients in a simple linear regression' },
          { id: 'QM-SLR-4', reading: 'Simple Linear Regression', text: 'describe the use of analysis of variance (ANOVA) in regression analysis, interpret ANOVA results, and calculate and interpret the standard error of estimate in a simple linear regression' },
          { id: 'QM-SLR-5', reading: 'Simple Linear Regression', text: 'calculate and interpret the predicted value for the dependent variable, and a prediction interval for it, given an estimated linear regression model and a value for the independent variable' },
          { id: 'QM-SLR-6', reading: 'Simple Linear Regression', text: 'describe different functional forms of simple linear regressions' },
        ]
      },
      {
        name: 'Introduction to Big Data Techniques',
        learningObjectives: [
          { id: 'QM-BDT-1', reading: 'Introduction to Big Data Techniques', text: 'describe aspects of "fintech" that are directly relevant for the gathering and analyzing of financial data' },
          { id: 'QM-BDT-2', reading: 'Introduction to Big Data Techniques', text: 'describe Big Data, artificial intelligence, and machine learning' },
          { id: 'QM-BDT-3', reading: 'Introduction to Big Data Techniques', text: 'describe applications of Big Data and Data Science to investment management' },
        ]
      },
    ]
  },
  {
    topicName: 'Economics',
    readings: [
      {
        name: 'The Firm and Market Structures',
        learningObjectives: [
          { id: 'ECON-FMS-1', reading: 'The Firm and Market Structures', text: 'determine and interpret breakeven and shutdown points of production, as well as how economies and diseconomies of scale affect costs under perfect and imperfect competition' },
          { id: 'ECON-FMS-2', reading: 'The Firm and Market Structures', text: 'describe characteristics of perfect competition, monopolistic competition, oligopoly, and pure monopoly' },
          { id: 'ECON-FMS-3', reading: 'The Firm and Market Structures', text: 'explain supply and demand relationships under monopolistic competition, including the optimal price and output for firms as well as pricing strategy' },
          { id: 'ECON-FMS-4', reading: 'The Firm and Market Structures', text: 'explain supply and demand relationships under oligopoly, including the optimal price and output for firms as well as pricing strategy' },
          { id: 'ECON-FMS-5', reading: 'The Firm and Market Structures', text: 'identify the type of market structure within which a firm operates and describe the use and limitations of concentration measures' },
        ]
      },
      {
        name: 'Understanding Business Cycles',
        learningObjectives: [
          { id: 'ECON-UBC-1', reading: 'Understanding Business Cycles', text: 'describe the business cycle and its phases' },
          { id: 'ECON-UBC-2', reading: 'Understanding Business Cycles', text: 'describe credit cycles' },
          { id: 'ECON-UBC-3', reading: 'Understanding Business Cycles', text: 'describe how resource use, consumer and business activity, housing sector activity, and external trade sector activity vary over the business cycle and describe their measurement using economic indicators' },
        ]
      },
      {
        name: 'Fiscal Policy',
        learningObjectives: [
          { id: 'ECON-FP-1', reading: 'Fiscal Policy', text: 'compare monetary and fiscal policy' },
          { id: 'ECON-FP-2', reading: 'Fiscal Policy', text: 'describe roles and objectives of fiscal policy as well as arguments as to whether the size of a national debt relative to GDP matters' },
          { id: 'ECON-FP-3', reading: 'Fiscal Policy', text: 'describe tools of fiscal policy, including their advantages and disadvantages' },
          { id: 'ECON-FP-4', reading: 'Fiscal Policy', text: 'explain the implementation of fiscal policy and difficulties of implementation as well as whether a fiscal policy is expansionary or contractionary' },
        ]
      },
      {
        name: 'Monetary Policy',
        learningObjectives: [
          { id: 'ECON-MP-1', reading: 'Monetary Policy', text: 'describe the roles and objectives of central banks' },
          { id: 'ECON-MP-2', reading: 'Monetary Policy', text: 'describe tools used to implement monetary policy tools and the monetary transmission mechanism, and explain the relationships between monetary policy and economic growth, inflation, interest, and exchange rates' },
          { id: 'ECON-MP-3', reading: 'Monetary Policy', text: 'describe qualities of effective central banks; contrast their use of inflation, interest rate, and exchange rate targeting in expansionary or contractionary monetary policy; and describe the limitations of monetary policy' },
          { id: 'ECON-MP-4', reading: 'Monetary Policy', text: 'explain the interaction of monetary and fiscal policy' },
        ]
      },
      {
        name: 'Introduction to Geopolitics',
        learningObjectives: [
          { id: 'ECON-IG-1', reading: 'Introduction to Geopolitics', text: 'describe geopolitics from a cooperation versus competition perspective' },
          { id: 'ECON-IG-2', reading: 'Introduction to Geopolitics', text: 'describe geopolitics and its relationship with globalization' },
          { id: 'ECON-IG-3', reading: 'Introduction to Geopolitics', text: 'describe functions and objectives of the international organizations that facilitate trade, including the World Bank, the International Monetary Fund, and the World Trade Organization' },
          { id: 'ECON-IG-4', reading: 'Introduction to Geopolitics', text: 'describe geopolitical risk' },
          { id: 'ECON-IG-5', reading: 'Introduction to Geopolitics', text: 'describe tools of geopolitics and their impact on regions and economies' },
          { id: 'ECON-IG-6', reading: 'Introduction to Geopolitics', text: 'describe the impact of geopolitical risk on investments' },
        ]
      },
      {
        name: 'International Trade',
        learningObjectives: [
          { id: 'ECON-IT-1', reading: 'International Trade', text: 'describe the benefits and costs of international trade' },
          { id: 'ECON-IT-2', reading: 'International Trade', text: 'compare types of trade restrictions, such as tariffs, quotas, and export subsidies, and their economic implications' },
          { id: 'ECON-IT-3', reading: 'International Trade', text: 'explain motivations for and advantages of trading blocs, common markets, and economic unions' },
        ]
      },
      {
        name: 'Capital Flows and the FX Market',
        learningObjectives: [
          { id: 'ECON-CFFX-1', reading: 'Capital Flows and the FX Market', text: 'describe the foreign exchange market, including its functions and participants, distinguish between nominal and real exchange rates, and calculate and interpret the percentage change in a currency relative to another currency' },
          { id: 'ECON-CFFX-2', reading: 'Capital Flows and the FX Market', text: "describe exchange rate regimes and explain the effects of exchange rates on countries' international trade and capital flows" },
          { id: 'ECON-CFFX-3', reading: 'Capital Flows and the FX Market', text: 'describe common objectives of capital restrictions imposed by governments' },
        ]
      },
      {
        name: 'Exchange Rate Calculations',
        learningObjectives: [
          { id: 'ECON-ERC-1', reading: 'Exchange Rate Calculations', text: 'calculate and interpret currency cross-rates' },
          { id: 'ECON-ERC-2', reading: 'Exchange Rate Calculations', text: 'explain the arbitrage relationship between spot and forward exchange rates and interest rates, calculate a forward rate using points or in percentage terms, and interpret a forward discount or premium' },
        ]
      },
    ]
  },
  {
    topicName: 'Corporate Issuers',
    readings: [
      {
        name: 'Organizational Forms, Corporate Issuer Features, and Ownership',
        learningObjectives: [
          { id: 'CI-OFCFO-1', reading: 'Organizational Forms, Corporate Issuer Features, and Ownership', text: 'compare the organizational forms of businesses' },
          { id: 'CI-OFCFO-2', reading: 'Organizational Forms, Corporate Issuer Features, and Ownership', text: 'describe key features of corporate issuers' },
          { id: 'CI-OFCFO-3', reading: 'Organizational Forms, Corporate Issuer Features, and Ownership', text: 'compare publicly and privately owned corporate issuers' },
        ]
      },
      {
        name: 'Investors and Other Stakeholders',
        learningObjectives: [
          { id: 'CI-IOS-1', reading: 'Investors and Other Stakeholders', text: 'compare the financial claims and motivations of lenders and shareholders' },
          { id: 'CI-IOS-2', reading: 'Investors and Other Stakeholders', text: "describe a company's stakeholder groups and compare their interests" },
          { id: 'CI-IOS-3', reading: 'Investors and Other Stakeholders', text: 'describe environmental, social, and governance factors of corporate issuers considered by investors' },
        ]
      },
      {
        name: 'Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits',
        learningObjectives: [
          { id: 'CI-CG-1', reading: 'Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits', text: 'describe the principal-agent relationship and conflicts that may arise between stakeholder groups' },
          { id: 'CI-CG-2', reading: 'Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits', text: 'describe corporate governance and mechanisms to manage stakeholder relationships and mitigate associated risks' },
          { id: 'CI-CG-3', reading: 'Corporate Governance: Conflicts, Mechanisms, Risks, and Benefits', text: 'describe potential risks of poor corporate governance and stakeholder management and benefits of effective corporate governance and stakeholder management' },
        ]
      },
      {
        name: 'Working Capital and Liquidity',
        learningObjectives: [
          { id: 'CI-WCL-1', reading: 'Working Capital and Liquidity', text: "explain the cash conversion cycle and compare issuers' cash conversion cycles" },
          { id: 'CI-WCL-2', reading: 'Working Capital and Liquidity', text: "explain liquidity and compare issuers' liquidity levels" },
          { id: 'CI-WCL-3', reading: 'Working Capital and Liquidity', text: "describe issuers' objectives and compare methods for managing working capital and liquidity" },
        ]
      },
      {
        name: 'Capital Investments and Capital Allocation',
        learningObjectives: [
          { id: 'CI-CICA-1', reading: 'Capital Investments and Capital Allocation', text: 'describe types of capital investments' },
          { id: 'CI-CICA-2', reading: 'Capital Investments and Capital Allocation', text: 'describe the capital allocation process, calculate net present value (NPV), internal rate of return (IRR), and return on invested capital (ROIC), and contrast their use in capital allocation' },
          { id: 'CI-CICA-3', reading: 'Capital Investments and Capital Allocation', text: 'describe principles of capital allocation and common capital allocation pitfalls' },
          { id: 'CI-CICA-4', reading: 'Capital Investments and Capital Allocation', text: 'describe types of real options relevant to capital investments' },
        ]
      },
      {
        name: 'Capital Structure',
        learningObjectives: [
          { id: 'CI-CS-1', reading: 'Capital Structure', text: 'calculate and interpret the weighted-average cost of capital for a company' },
          { id: 'CI-CS-2', reading: 'Capital Structure', text: 'explain factors affecting capital structure and the weighted-average cost of capital' },
          { id: 'CI-CS-3', reading: 'Capital Structure', text: 'explain the Modigliani–Miller propositions regarding capital structure' },
          { id: 'CI-CS-4', reading: 'Capital Structure', text: 'describe optimal and target capital structures' },
        ]
      },
      {
        name: 'Business Models',
        learningObjectives: [
          { id: 'CI-BM-1', reading: 'Business Models', text: 'describe key features of business models' },
          { id: 'CI-BM-2', reading: 'Business Models', text: 'describe various types of business models' },
        ]
      },
    ]
  },
  {
    topicName: 'Financial Statement Analysis',
    readings: [
      {
        name: 'Introduction to Financial Statement Analysis',
        learningObjectives: [
          { id: 'FSA-IFSA-1', reading: 'Introduction to Financial Statement Analysis', text: 'describe the steps in the financial statement analysis framework' },
          { id: 'FSA-IFSA-2', reading: 'Introduction to Financial Statement Analysis', text: 'describe the roles of financial statement analysis' },
          { id: 'FSA-IFSA-3', reading: 'Introduction to Financial Statement Analysis', text: "describe the importance of regulatory filings, financial statement notes and supplementary information, management's commentary, and audit reports" },
          { id: 'FSA-IFSA-4', reading: 'Introduction to Financial Statement Analysis', text: 'describe implications for financial analysis of alternative financial reporting systems and the importance of monitoring developments in financial reporting standards' },
          { id: 'FSA-IFSA-5', reading: 'Introduction to Financial Statement Analysis', text: 'describe information sources that analysts use in financial statement analysis besides annual and interim financial reports' },
        ]
      },
      {
        name: 'Analyzing Income Statements',
        learningObjectives: [
          { id: 'FSA-AIS-1', reading: 'Analyzing Income Statements', text: 'describe general principles of revenue recognition, specific revenue recognition applications, and implications of revenue recognition choices for financial analysis' },
          { id: 'FSA-AIS-2', reading: 'Analyzing Income Statements', text: 'describe general principles of expense recognition, specific expense recognition applications, implications of expense recognition choices for financial analysis and contrast costs that are capitalized versus those that are expensed in the period in which they are incurred' },
          { id: 'FSA-AIS-3', reading: 'Analyzing Income Statements', text: 'describe the financial reporting treatment and analysis of non-recurring items (including discontinued operations, unusual or infrequent items) and changes in accounting policies' },
          { id: 'FSA-AIS-4', reading: 'Analyzing Income Statements', text: "describe how earnings per share is calculated and calculate and interpret a company's basic and diluted earnings per share for companies with simple and complex capital structures including those with antidilutive securities" },
          { id: 'FSA-AIS-5', reading: 'Analyzing Income Statements', text: "evaluate a company's financial performance using common-size income statements and financial ratios based on the income statement" },
        ]
      },
      {
        name: 'Analyzing Balance Sheets',
        learningObjectives: [
          { id: 'FSA-ABS-1', reading: 'Analyzing Balance Sheets', text: 'explain the financial reporting and disclosures related to intangible assets' },
          { id: 'FSA-ABS-2', reading: 'Analyzing Balance Sheets', text: 'explain the financial reporting and disclosures related to goodwill' },
          { id: 'FSA-ABS-3', reading: 'Analyzing Balance Sheets', text: 'explain the financial reporting and disclosures related to financial instruments' },
          { id: 'FSA-ABS-4', reading: 'Analyzing Balance Sheets', text: 'explain the financial reporting and disclosures related to non-current liabilities' },
          { id: 'FSA-ABS-5', reading: 'Analyzing Balance Sheets', text: 'calculate and interpret common-size balance sheets and related financial ratios' },
        ]
      },
      {
        name: 'Analyzing Statements of Cash Flows I',
        learningObjectives: [
          { id: 'FSA-ASCF1-1', reading: 'Analyzing Statements of Cash Flows I', text: 'describe how the cash flow statement is linked to the income statement and the balance sheet' },
          { id: 'FSA-ASCF1-2', reading: 'Analyzing Statements of Cash Flows I', text: 'describe the steps in the preparation of direct and indirect cash flow statements, including how cash flows can be computed using income statement and balance sheet data' },
          { id: 'FSA-ASCF1-3', reading: 'Analyzing Statements of Cash Flows I', text: 'demonstrate the conversion of cash flows from the indirect to direct method' },
          { id: 'FSA-ASCF1-4', reading: 'Analyzing Statements of Cash Flows I', text: 'contrast cash flow statements prepared under International Financial Reporting Standards (IFRS) and US generally accepted accounting principles (US GAAP)' },
        ]
      },
      {
        name: 'Analyzing Statements of Cash Flows II',
        learningObjectives: [
          { id: 'FSA-ASCF2-1', reading: 'Analyzing Statements of Cash Flows II', text: 'analyze and interpret both reported and common-size cash flow statements' },
          { id: 'FSA-ASCF2-2', reading: 'Analyzing Statements of Cash Flows II', text: 'calculate and interpret free cash flow to the firm, free cash flow to equity, and performance and coverage cash flow ratios' },
        ]
      },
      {
        name: 'Analysis of Inventories',
        learningObjectives: [
          { id: 'FSA-AOI-1', reading: 'Analysis of Inventories', text: 'describe the measurement of inventory at the lower of cost and net realisable value and its implications for financial statements and ratios' },
          { id: 'FSA-AOI-2', reading: 'Analysis of Inventories', text: 'calculate and explain how inflation and deflation of inventory costs affect the financial statements and ratios of companies that use different inventory valuation methods' },
          { id: 'FSA-AOI-3', reading: 'Analysis of Inventories', text: "describe the presentation and disclosures relating to inventories and explain issues that analysts should consider when examining a company's inventory disclosures and other sources of information" },
        ]
      },
      {
        name: 'Analysis of Long-Term Assets',
        learningObjectives: [
          { id: 'FSA-ALTA-1', reading: 'Analysis of Long-Term Assets', text: 'compare the financial reporting of the following types of intangible assets: purchased, internally developed, and acquired in a business combination' },
          { id: 'FSA-ALTA-2', reading: 'Analysis of Long-Term Assets', text: 'explain and evaluate how impairment and derecognition of property, plant, and equipment and intangible assets affect the financial statements and ratios' },
          { id: 'FSA-ALTA-3', reading: 'Analysis of Long-Term Assets', text: 'analyze and interpret financial statement disclosures regarding property, plant, and equipment and intangible assets' },
        ]
      },
      {
        name: 'Topics in Long-Term Liabilities and Equity',
        learningObjectives: [
          { id: 'FSA-TLTLE-1', reading: 'Topics in Long-Term Liabilities and Equity', text: 'explain the financial reporting of leases from the perspectives of lessors and lessees' },
          { id: 'FSA-TLTLE-2', reading: 'Topics in Long-Term Liabilities and Equity', text: 'explain the financial reporting of defined contribution, defined benefit, and stock-based compensation plans' },
          { id: 'FSA-TLTLE-3', reading: 'Topics in Long-Term Liabilities and Equity', text: 'describe the financial statement presentation of and disclosures relating to long-term liabilities and share-based compensation' },
        ]
      },
      {
        name: 'Analysis of Income Taxes',
        learningObjectives: [
          { id: 'FSA-AIT-1', reading: 'Analysis of Income Taxes', text: 'contrast accounting profit, taxable income, taxes payable, and income tax expense and temporary versus permanent differences between accounting profit and taxable income' },
          { id: 'FSA-AIT-2', reading: 'Analysis of Income Taxes', text: "explain how deferred tax liabilities and assets are created and the factors that determine how a company's deferred tax liabilities and assets should be treated for the purposes of financial analysis" },
          { id: 'FSA-AIT-3', reading: 'Analysis of Income Taxes', text: "calculate, interpret, and contrast an issuer's effective tax rate, statutory tax rate, and cash tax rate" },
          { id: 'FSA-AIT-4', reading: 'Analysis of Income Taxes', text: "analyze disclosures relating to deferred tax items and the effective tax rate reconciliation and explain how information included in these disclosures affects a company's financial statements and financial ratios" },
        ]
      },
      {
        name: 'Financial Reporting Quality',
        learningObjectives: [
          { id: 'FSA-FRQ-1', reading: 'Financial Reporting Quality', text: 'compare financial reporting quality with the quality of reported results (including quality of earnings, cash flow, and balance sheet items)' },
          { id: 'FSA-FRQ-2', reading: 'Financial Reporting Quality', text: 'describe a spectrum for assessing financial reporting quality' },
          { id: 'FSA-FRQ-3', reading: 'Financial Reporting Quality', text: 'explain the difference between conservative and aggressive accounting' },
          { id: 'FSA-FRQ-4', reading: 'Financial Reporting Quality', text: 'describe motivations that might cause management to issue financial reports that are not high quality and conditions that are conducive to issuing low-quality, or even fraudulent, financial reports' },
          { id: 'FSA-FRQ-5', reading: 'Financial Reporting Quality', text: 'describe mechanisms that discipline financial reporting quality and the potential limitations of those mechanisms' },
          { id: 'FSA-FRQ-6', reading: 'Financial Reporting Quality', text: "describe presentation choices, including non-GAAP measures, that could be used to influence an analyst's opinion" },
          { id: 'FSA-FRQ-7', reading: 'Financial Reporting Quality', text: 'describe accounting methods (choices and estimates) that could be used to manage earnings, cash flow, and balance sheet items' },
          { id: 'FSA-FRQ-8', reading: 'Financial Reporting Quality', text: 'describe accounting warning signs and methods for detecting manipulation of information in financial reports' },
        ]
      },
      {
        name: 'Financial Analysis Techniques',
        learningObjectives: [
          { id: 'FSA-FAT-1', reading: 'Financial Analysis Techniques', text: 'describe tools and techniques used in financial analysis, including their uses and limitations' },
          { id: 'FSA-FAT-2', reading: 'Financial Analysis Techniques', text: 'calculate and interpret activity, liquidity, solvency, and profitability ratios' },
          { id: 'FSA-FAT-3', reading: 'Financial Analysis Techniques', text: 'describe relationships among ratios and evaluate a company using ratio analysis' },
          { id: 'FSA-FAT-4', reading: 'Financial Analysis Techniques', text: 'demonstrate the application of DuPont analysis of return on equity and calculate and interpret effects of changes in its components' },
          { id: 'FSA-FAT-5', reading: 'Financial Analysis Techniques', text: 'describe the uses of industry-specific ratios used in financial analysis' },
          { id: 'FSA-FAT-6', reading: 'Financial Analysis Techniques', text: 'describe how ratio analysis and other techniques can be used to model and forecast earnings' },
        ]
      },
      {
        name: 'Introduction to Financial Statement Modeling',
        learningObjectives: [
          { id: 'FSA-IFSM-1', reading: 'Introduction to Financial Statement Modeling', text: 'demonstrate the development of a sales-based pro forma company model' },
          { id: 'FSA-IFSM-2', reading: 'Introduction to Financial Statement Modeling', text: 'explain how behavioral factors affect analyst forecasts and recommend remedial actions for analyst biases' },
          { id: 'FSA-IFSM-3', reading: 'Introduction to Financial Statement Modeling', text: "explain how the competitive position of a company based on a Porter's five forces analysis affects prices and costs" },
          { id: 'FSA-IFSM-4', reading: 'Introduction to Financial Statement Modeling', text: 'explain how to forecast industry and company sales and costs when they are subject to price inflation or deflation' },
          { id: 'FSA-IFSM-5', reading: 'Introduction to Financial Statement Modeling', text: "explain considerations in the choice of an explicit forecast horizon and an analyst's choices in developing projections beyond the short-term forecast horizon" },
        ]
      },
    ]
  },
  {
    topicName: 'Equity Investments',
    readings: [
      {
        name: 'Market Organization and Structure',
        learningObjectives: [
          { id: 'EI-MOS-1', reading: 'Market Organization and Structure', text: 'explain the main functions of the financial system' },
          { id: 'EI-MOS-2', reading: 'Market Organization and Structure', text: 'describe classifications of assets and markets' },
          { id: 'EI-MOS-3', reading: 'Market Organization and Structure', text: 'describe the major types of securities, currencies, contracts, commodities, and real assets that trade in organized markets, including their distinguishing characteristics and major subtypes' },
          { id: 'EI-MOS-4', reading: 'Market Organization and Structure', text: 'describe types of financial intermediaries and services that they provide' },
          { id: 'EI-MOS-5', reading: 'Market Organization and Structure', text: 'compare positions an investor can take in an asset' },
          { id: 'EI-MOS-6', reading: 'Market Organization and Structure', text: 'calculate and interpret the leverage ratio, the rate of return on a margin transaction, and the security price at which the investor would receive a margin call' },
          { id: 'EI-MOS-7', reading: 'Market Organization and Structure', text: 'compare execution, validity, and clearing instructions' },
          { id: 'EI-MOS-8', reading: 'Market Organization and Structure', text: 'compare market orders with limit orders' },
          { id: 'EI-MOS-9', reading: 'Market Organization and Structure', text: 'define primary and secondary markets and explain how secondary markets support primary markets' },
          { id: 'EI-MOS-10', reading: 'Market Organization and Structure', text: 'describe how securities, contracts, and currencies are traded in quote-driven, order-driven, and brokered markets' },
          { id: 'EI-MOS-11', reading: 'Market Organization and Structure', text: 'describe characteristics of a well-functioning financial system' },
          { id: 'EI-MOS-12', reading: 'Market Organization and Structure', text: 'describe objectives of market regulation' },
        ]
      },
      {
        name: 'Security Market Indexes',
        learningObjectives: [
          { id: 'EI-SMI-1', reading: 'Security Market Indexes', text: 'describe a security market index' },
          { id: 'EI-SMI-2', reading: 'Security Market Indexes', text: 'calculate and interpret the value, price return, and total return of an index' },
          { id: 'EI-SMI-3', reading: 'Security Market Indexes', text: 'describe the choices and issues in index construction and management' },
          { id: 'EI-SMI-4', reading: 'Security Market Indexes', text: 'compare the different weighting methods used in index construction' },
          { id: 'EI-SMI-5', reading: 'Security Market Indexes', text: 'calculate and analyze the value and return of an index given its weighting method' },
          { id: 'EI-SMI-6', reading: 'Security Market Indexes', text: 'describe rebalancing and reconstitution of an index' },
          { id: 'EI-SMI-7', reading: 'Security Market Indexes', text: 'describe uses of security market indexes' },
          { id: 'EI-SMI-8', reading: 'Security Market Indexes', text: 'describe types of equity indexes' },
          { id: 'EI-SMI-9', reading: 'Security Market Indexes', text: 'compare types of security market indexes' },
          { id: 'EI-SMI-10', reading: 'Security Market Indexes', text: 'describe types of fixed-income indexes' },
          { id: 'EI-SMI-11', reading: 'Security Market Indexes', text: 'describe indexes representing alternative investments' },
        ]
      },
      {
        name: 'Market Efficiency',
        learningObjectives: [
          { id: 'EI-ME-1', reading: 'Market Efficiency', text: 'describe market efficiency and related concepts, including their importance to investment practitioners' },
          { id: 'EI-ME-2', reading: 'Market Efficiency', text: 'contrast market value and intrinsic value' },
          { id: 'EI-ME-3', reading: 'Market Efficiency', text: "explain factors that affect a market's efficiency" },
          { id: 'EI-ME-4', reading: 'Market Efficiency', text: 'contrast weak-form, semi-strong-form, and strong-form market efficiency' },
          { id: 'EI-ME-5', reading: 'Market Efficiency', text: 'explain the implications of each form of market efficiency for fundamental analysis, technical analysis, and the choice between active and passive portfolio management' },
          { id: 'EI-ME-6', reading: 'Market Efficiency', text: 'describe market anomalies' },
          { id: 'EI-ME-7', reading: 'Market Efficiency', text: 'describe behavioral finance and its potential relevance to understanding market anomalies' },
        ]
      },
      {
        name: 'Overview of Equity Securities',
        learningObjectives: [
          { id: 'EI-OES-1', reading: 'Overview of Equity Securities', text: 'describe characteristics of types of equity securities' },
          { id: 'EI-OES-2', reading: 'Overview of Equity Securities', text: 'describe differences in voting rights and other ownership characteristics among different equity classes' },
          { id: 'EI-OES-3', reading: 'Overview of Equity Securities', text: 'compare and contrast public and private equity securities' },
          { id: 'EI-OES-4', reading: 'Overview of Equity Securities', text: 'describe methods for investing in non-domestic equity securities' },
          { id: 'EI-OES-5', reading: 'Overview of Equity Securities', text: 'compare the risk and return characteristics of different types of equity securities' },
          { id: 'EI-OES-6', reading: 'Overview of Equity Securities', text: "explain the role of equity securities in the financing of a company's assets" },
          { id: 'EI-OES-7', reading: 'Overview of Equity Securities', text: 'contrast the market value and book value of equity securities' },
          { id: 'EI-OES-8', reading: 'Overview of Equity Securities', text: "compare a company's cost of equity, its (accounting) return on equity, and investors' required rates of return" },
        ]
      },
      {
        name: 'Company Analysis: Past and Present',
        learningObjectives: [
          { id: 'EI-CAPP-1', reading: 'Company Analysis: Past and Present', text: 'describe the elements that should be covered in a thorough company research report' },
          { id: 'EI-CAPP-2', reading: 'Company Analysis: Past and Present', text: "determine a company's business model" },
          { id: 'EI-CAPP-3', reading: 'Company Analysis: Past and Present', text: "evaluate a company's revenue and revenue drivers, including pricing power" },
          { id: 'EI-CAPP-4', reading: 'Company Analysis: Past and Present', text: "evaluate a company's operating profitability and working capital using key measures" },
          { id: 'EI-CAPP-5', reading: 'Company Analysis: Past and Present', text: "evaluate a company's capital investments and capital structure" },
        ]
      },
      {
        name: 'Industry and Competitive Analysis',
        learningObjectives: [
          { id: 'EI-ICA-1', reading: 'Industry and Competitive Analysis', text: 'describe the purposes of, and steps involved in, industry and competitive analysis' },
          { id: 'EI-ICA-2', reading: 'Industry and Competitive Analysis', text: 'describe industry classification methods and compare methods by which companies can be grouped' },
          { id: 'EI-ICA-3', reading: 'Industry and Competitive Analysis', text: "determine an industry's size, growth characteristics, profitability, and market share trends" },
          { id: 'EI-ICA-4', reading: 'Industry and Competitive Analysis', text: "analyze an industry's structure and external influences using Porter's Five Forces and PESTLE frameworks" },
          { id: 'EI-ICA-5', reading: 'Industry and Competitive Analysis', text: 'evaluate the competitive strategy and position of a company' },
        ]
      },
      {
        name: 'Company Analysis: Forecasting',
        learningObjectives: [
          { id: 'EI-CAF-1', reading: 'Company Analysis: Forecasting', text: "explain principles and approaches to forecasting a company's financial results and position" },
          { id: 'EI-CAF-2', reading: 'Company Analysis: Forecasting', text: "explain approaches to forecasting a company's revenues" },
          { id: 'EI-CAF-3', reading: 'Company Analysis: Forecasting', text: "explain approaches to forecasting a company's operating expenses and working capital" },
          { id: 'EI-CAF-4', reading: 'Company Analysis: Forecasting', text: "explain approaches to forecasting a company's capital investments and capital structure" },
          { id: 'EI-CAF-5', reading: 'Company Analysis: Forecasting', text: 'describe the use of scenario analysis in forecasting' },
        ]
      },
      {
        name: 'Equity Valuation: Concepts and Basic Tools',
        learningObjectives: [
          { id: 'EI-EVCBT-1', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'evaluate whether a security, given its current market price and a value estimate, is overvalued, fairly valued, or undervalued by the market' },
          { id: 'EI-EVCBT-2', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'describe major categories of equity valuation models' },
          { id: 'EI-EVCBT-3', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'describe regular cash dividends, extra dividends, stock dividends, stock splits, reverse stock splits, and share repurchases' },
          { id: 'EI-EVCBT-4', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'describe dividend payment chronology' },
          { id: 'EI-EVCBT-5', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'explain the rationale for using present value models to value equity and describe the dividend discount and free-cash-flow-to-equity models' },
          { id: 'EI-EVCBT-6', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'explain advantages and disadvantages of each category of valuation model' },
          { id: 'EI-EVCBT-7', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'calculate the intrinsic value of a non-callable, non-convertible preferred stock' },
          { id: 'EI-EVCBT-8', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'calculate and interpret the intrinsic value of an equity security based on the Gordon (constant) growth dividend discount model or a two-stage dividend discount model, as appropriate' },
          { id: 'EI-EVCBT-9', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'identify characteristics of companies for which the constant growth or a multistage dividend discount model is appropriate' },
          { id: 'EI-EVCBT-10', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'explain the rationale for using price multiples to value equity, how the price to earnings multiple relates to fundamentals, and the use of multiples based on comparables' },
          { id: 'EI-EVCBT-11', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'calculate and interpret the following multiples: price to earnings, price to an estimate of operating cash flow, price to sales, and price to book value' },
          { id: 'EI-EVCBT-12', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'describe enterprise value multiples and their use in estimating equity value' },
          { id: 'EI-EVCBT-13', reading: 'Equity Valuation: Concepts and Basic Tools', text: 'describe asset-based valuation models and their use in estimating equity value' },
        ]
      },
    ]
  },
  {
    topicName: 'Fixed Income',
    readings: [
      {
        name: 'Fixed-Income Instrument Features',
        learningObjectives: [
          { id: 'FI-FIIF-1', reading: 'Fixed-Income Instrument Features', text: 'describe the features of a fixed-income security' },
          { id: 'FI-FIIF-2', reading: 'Fixed-Income Instrument Features', text: 'describe the contents of a bond indenture and contrast affirmative and negative covenants' },
        ]
      },
      {
        name: 'Fixed-Income Cash Flows and Types',
        learningObjectives: [
          { id: 'FI-FICFT-1', reading: 'Fixed-Income Cash Flows and Types', text: 'describe common cash flow structures of fixed-income instruments and contrast cash flow contingency provisions that benefit issuers and investors' },
          { id: 'FI-FICFT-2', reading: 'Fixed-Income Cash Flows and Types', text: 'describe how legal, regulatory, and tax considerations affect the issuance and trading of fixed-income securities' },
        ]
      },
      {
        name: 'Fixed-Income Issuance and Trading',
        learningObjectives: [
          { id: 'FI-FIIT-1', reading: 'Fixed-Income Issuance and Trading', text: 'describe fixed-income market segments and their issuer and investor participants' },
          { id: 'FI-FIIT-2', reading: 'Fixed-Income Issuance and Trading', text: 'describe types of fixed-income indexes' },
          { id: 'FI-FIIT-3', reading: 'Fixed-Income Issuance and Trading', text: 'compare primary and secondary fixed-income markets to equity markets' },
        ]
      },
      {
        name: 'Fixed-Income Markets for Corporate Issuers',
        learningObjectives: [
          { id: 'FI-FIMCI-1', reading: 'Fixed-Income Markets for Corporate Issuers', text: 'compare short-term funding alternatives available to corporations and financial institutions' },
          { id: 'FI-FIMCI-2', reading: 'Fixed-Income Markets for Corporate Issuers', text: 'describe repurchase agreements (repos), their uses, and their benefits and risks' },
          { id: 'FI-FIMCI-3', reading: 'Fixed-Income Markets for Corporate Issuers', text: 'contrast the long-term funding of investment-grade versus high-yield corporate issuers' },
        ]
      },
      {
        name: 'Fixed-Income Markets for Government Issuers',
        learningObjectives: [
          { id: 'FI-FIMGI-1', reading: 'Fixed-Income Markets for Government Issuers', text: 'describe funding choices by sovereign and non-sovereign governments, quasi-government entities, and supranational agencies' },
          { id: 'FI-FIMGI-2', reading: 'Fixed-Income Markets for Government Issuers', text: 'contrast the issuance and trading of government and corporate fixed-income instruments' },
        ]
      },
      {
        name: 'Fixed-Income Bond Valuation: Prices and Yields',
        learningObjectives: [
          { id: 'FI-FIBVPY-1', reading: 'Fixed-Income Bond Valuation: Prices and Yields', text: "calculate a bond's price given a yield-to-maturity on or between coupon dates" },
          { id: 'FI-FIBVPY-2', reading: 'Fixed-Income Bond Valuation: Prices and Yields', text: "identify the relationships among a bond's price, coupon rate, maturity, and yield-to-maturity" },
          { id: 'FI-FIBVPY-3', reading: 'Fixed-Income Bond Valuation: Prices and Yields', text: 'describe matrix pricing' },
        ]
      },
      {
        name: 'Yield and Yield Spread Measures for Fixed-Rate Bonds',
        learningObjectives: [
          { id: 'FI-YYSMFRB-1', reading: 'Yield and Yield Spread Measures for Fixed-Rate Bonds', text: 'calculate annual yield on a bond for varying compounding periods in a year' },
          { id: 'FI-YYSMFRB-2', reading: 'Yield and Yield Spread Measures for Fixed-Rate Bonds', text: 'compare, calculate, and interpret yield and yield spread measures for fixed-rate bonds' },
        ]
      },
      {
        name: 'Yield and Yield Spread Measures for Floating-Rate Instruments',
        learningObjectives: [
          { id: 'FI-YYSMFRI-1', reading: 'Yield and Yield Spread Measures for Floating-Rate Instruments', text: 'calculate and interpret yield spread measures for floating-rate instruments' },
          { id: 'FI-YYSMFRI-2', reading: 'Yield and Yield Spread Measures for Floating-Rate Instruments', text: 'calculate and interpret yield measures for money market instruments' },
        ]
      },
      {
        name: 'The Term Structure of Interest Rates: Spot, Par, and Forward Curves',
        learningObjectives: [
          { id: 'FI-TSIRSPPFC-1', reading: 'The Term Structure of Interest Rates: Spot, Par, and Forward Curves', text: 'define spot rates and the spot curve, and calculate the price of a bond using spot rates' },
          { id: 'FI-TSIRSPPFC-2', reading: 'The Term Structure of Interest Rates: Spot, Par, and Forward Curves', text: 'define par and forward rates, and calculate par rates, forward rates from spot rates, spot rates from forward rates, and the price of a bond using forward rates' },
          { id: 'FI-TSIRSPPFC-3', reading: 'The Term Structure of Interest Rates: Spot, Par, and Forward Curves', text: 'compare the spot curve, par curve, and forward curve' },
        ]
      },
      {
        name: 'Interest Rate Risk and Return',
        learningObjectives: [
          { id: 'FI-IRRR-1', reading: 'Interest Rate Risk and Return', text: 'calculate and interpret the sources of return from investing in a fixed-rate bond' },
          { id: 'FI-IRRR-2', reading: 'Interest Rate Risk and Return', text: "describe the relationships among a bond's holding period return, its Macaulay duration, and the investment horizon" },
          { id: 'FI-IRRR-3', reading: 'Interest Rate Risk and Return', text: 'define, calculate, and interpret Macaulay duration' },
        ]
      },
      {
        name: 'Yield-Based Bond Duration Measures and Properties',
        learningObjectives: [
          { id: 'FI-YBBDMP-1', reading: 'Yield-Based Bond Duration Measures and Properties', text: 'define, calculate, and interpret modified duration, money duration, and the price value of a basis point (PVBP)' },
          { id: 'FI-YBBDMP-2', reading: 'Yield-Based Bond Duration Measures and Properties', text: "explain how a bond's maturity, coupon, and yield level affect its interest rate risk" },
        ]
      },
      {
        name: 'Yield-Based Bond Convexity and Portfolio Properties',
        learningObjectives: [
          { id: 'FI-YBBCPP-1', reading: 'Yield-Based Bond Convexity and Portfolio Properties', text: 'calculate and interpret convexity and describe the convexity adjustment' },
          { id: 'FI-YBBCPP-2', reading: 'Yield-Based Bond Convexity and Portfolio Properties', text: "calculate the percentage price change of a bond for a specified change in yield, given the bond's duration and convexity" },
          { id: 'FI-YBBCPP-3', reading: 'Yield-Based Bond Convexity and Portfolio Properties', text: 'calculate portfolio duration and convexity and explain the limitations of these measures' },
        ]
      },
      {
        name: 'Curve-Based and Empirical Fixed-Income Risk Measures',
        learningObjectives: [
          { id: 'FI-CBEFRM-1', reading: 'Curve-Based and Empirical Fixed-Income Risk Measures', text: 'explain why effective duration and effective convexity are the most appropriate measures of interest rate risk for bonds with embedded options' },
          { id: 'FI-CBEFRM-2', reading: 'Curve-Based and Empirical Fixed-Income Risk Measures', text: "calculate the percentage price change of a bond for a specified change in benchmark yield, given the bond's effective duration and convexity" },
          { id: 'FI-CBEFRM-3', reading: 'Curve-Based and Empirical Fixed-Income Risk Measures', text: 'define key rate duration and describe its use to measure price sensitivity of fixed-income instruments to benchmark yield curve changes' },
          { id: 'FI-CBEFRM-4', reading: 'Curve-Based and Empirical Fixed-Income Risk Measures', text: 'describe the difference between empirical duration and analytical duration' },
        ]
      },
      {
        name: 'Credit Risk',
        learningObjectives: [
          { id: 'FI-CR-1', reading: 'Credit Risk', text: 'describe credit risk and its components, probability of default and loss given default' },
          { id: 'FI-CR-2', reading: 'Credit Risk', text: 'describe the uses of ratings from credit rating agencies and their limitations' },
          { id: 'FI-CR-3', reading: 'Credit Risk', text: 'describe macroeconomic, market, and issuer-specific factors that influence the level and volatility of yield spreads' },
        ]
      },
      {
        name: 'Credit Analysis for Government Issuers',
        learningObjectives: [
          { id: 'FI-CAGI-1', reading: 'Credit Analysis for Government Issuers', text: 'explain special considerations when evaluating the credit of sovereign and non-sovereign government debt issuers and issues' },
        ]
      },
      {
        name: 'Credit Analysis for Corporate Issuers',
        learningObjectives: [
          { id: 'FI-CACI-1', reading: 'Credit Analysis for Corporate Issuers', text: "describe the qualitative and quantitative factors used to evaluate a corporate borrower's creditworthiness" },
          { id: 'FI-CACI-2', reading: 'Credit Analysis for Corporate Issuers', text: 'calculate and interpret financial ratios used in credit analysis' },
          { id: 'FI-CACI-3', reading: 'Credit Analysis for Corporate Issuers', text: 'describe the seniority rankings of debt, secured versus unsecured debt and the priority of claims in bankruptcy, and their impact on credit ratings' },
        ]
      },
      {
        name: 'Fixed-Income Securitization',
        learningObjectives: [
          { id: 'FI-FIS-1', reading: 'Fixed-Income Securitization', text: 'explain benefits of securitization for issuers, investors, economies, and financial markets' },
          { id: 'FI-FIS-2', reading: 'Fixed-Income Securitization', text: 'describe securitization, including the parties and the roles they play' },
        ]
      },
      {
        name: 'Asset-Backed Security (ABS) Instrument and Market Features',
        learningObjectives: [
          { id: 'FI-ABSIMF-1', reading: 'Asset-Backed Security (ABS) Instrument and Market Features', text: 'describe characteristics and risks of covered bonds and how they differ from other asset-backed securities' },
          { id: 'FI-ABSIMF-2', reading: 'Asset-Backed Security (ABS) Instrument and Market Features', text: 'describe typical credit enhancement structures used in securitizations' },
          { id: 'FI-ABSIMF-3', reading: 'Asset-Backed Security (ABS) Instrument and Market Features', text: 'describe types and characteristics of non-mortgage asset-backed securities, including the cash flows and risks of each type' },
          { id: 'FI-ABSIMF-4', reading: 'Asset-Backed Security (ABS) Instrument and Market Features', text: 'describe collateralized debt obligations, including their cash flows and risks' },
        ]
      },
      {
        name: 'Mortgage-Backed Security (MBS) Instrument and Market Features',
        learningObjectives: [
          { id: 'FI-MBSIMF-1', reading: 'Mortgage-Backed Security (MBS) Instrument and Market Features', text: 'define prepayment risk and describe time tranching structures in securitizations and their purpose' },
          { id: 'FI-MBSIMF-2', reading: 'Mortgage-Backed Security (MBS) Instrument and Market Features', text: 'describe fundamental features of residential mortgage loans that are securitized' },
          { id: 'FI-MBSIMF-3', reading: 'Mortgage-Backed Security (MBS) Instrument and Market Features', text: 'describe types and characteristics of residential mortgage-backed securities, including mortgage pass-through securities and collateralized mortgage obligations, and explain the cash flows and risks for each type' },
          { id: 'FI-MBSIMF-4', reading: 'Mortgage-Backed Security (MBS) Instrument and Market Features', text: 'describe characteristics and risks of commercial mortgage-backed securities' },
        ]
      },
    ]
  },
  {
    topicName: 'Derivatives',
    readings: [
      {
        name: 'Derivative Instrument and Derivative Market Features',
        learningObjectives: [
          { id: 'DER-DIDMF-1', reading: 'Derivative Instrument and Derivative Market Features', text: 'define a derivative and describe basic features of a derivative instrument' },
          { id: 'DER-DIDMF-2', reading: 'Derivative Instrument and Derivative Market Features', text: 'describe the basic features of derivative markets, and contrast over-the-counter and exchange-traded derivative markets' },
        ]
      },
      {
        name: 'Forward Commitment and Contingent Claim Features and Instruments',
        learningObjectives: [
          { id: 'DER-FCCCFI-1', reading: 'Forward Commitment and Contingent Claim Features and Instruments', text: 'define forward contracts, futures contracts, swaps, options (calls and puts), and credit derivatives and compare their basic characteristics' },
          { id: 'DER-FCCCFI-2', reading: 'Forward Commitment and Contingent Claim Features and Instruments', text: 'determine the value at expiration and profit from a long or a short position in a call or put option' },
          { id: 'DER-FCCCFI-3', reading: 'Forward Commitment and Contingent Claim Features and Instruments', text: 'contrast forward commitments with contingent claims' },
        ]
      },
      {
        name: 'Derivative Benefits, Risks, and Issuer and Investor Uses',
        learningObjectives: [
          { id: 'DER-DBRIIU-1', reading: 'Derivative Benefits, Risks, and Issuer and Investor Uses', text: 'describe benefits and risks of derivative instruments' },
          { id: 'DER-DBRIIU-2', reading: 'Derivative Benefits, Risks, and Issuer and Investor Uses', text: 'compare the use of derivatives among issuers and investors' },
        ]
      },
      {
        name: 'Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives',
        learningObjectives: [
          { id: 'DER-ARCCPD-1', reading: 'Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives', text: 'explain how the concepts of arbitrage and replication are used in pricing derivatives' },
          { id: 'DER-ARCCPD-2', reading: 'Arbitrage, Replication, and the Cost of Carry in Pricing Derivatives', text: 'explain the difference between the spot and expected future price of an underlying and the cost of carry associated with holding the underlying asset' },
        ]
      },
      {
        name: 'Pricing and Valuation of Forward Contracts and for an Underlying with Varying Maturities',
        learningObjectives: [
          { id: 'DER-PVFCUVM-1', reading: 'Pricing and Valuation of Forward Contracts and for an Underlying with Varying Maturities', text: 'explain how the value and price of a forward contract are determined at initiation, during the life of the contract, and at expiration' },
          { id: 'DER-PVFCUVM-2', reading: 'Pricing and Valuation of Forward Contracts and for an Underlying with Varying Maturities', text: 'explain how forward rates are determined for interest rate forward contracts and describe the uses of these forward rates' },
        ]
      },
      {
        name: 'Pricing and Valuation of Futures Contracts',
        learningObjectives: [
          { id: 'DER-PVFC-1', reading: 'Pricing and Valuation of Futures Contracts', text: 'compare the value and price of forward and futures contracts' },
          { id: 'DER-PVFC-2', reading: 'Pricing and Valuation of Futures Contracts', text: 'explain why forward and futures prices differ' },
        ]
      },
      {
        name: 'Pricing and Valuation of Interest Rates and Other Swaps',
        learningObjectives: [
          { id: 'DER-PVIROS-1', reading: 'Pricing and Valuation of Interest Rates and Other Swaps', text: 'describe how swap contracts are similar to but different from a series of forward contracts' },
          { id: 'DER-PVIROS-2', reading: 'Pricing and Valuation of Interest Rates and Other Swaps', text: 'contrast the value and price of swaps' },
        ]
      },
      {
        name: 'Pricing and Valuation of Options',
        learningObjectives: [
          { id: 'DER-PVO-1', reading: 'Pricing and Valuation of Options', text: 'explain the exercise value, moneyness, and time value of an option' },
          { id: 'DER-PVO-2', reading: 'Pricing and Valuation of Options', text: 'contrast the use of arbitrage and replication concepts in pricing forward commitments and contingent claims' },
          { id: 'DER-PVO-3', reading: 'Pricing and Valuation of Options', text: 'identify the factors that determine the value of an option and describe how each factor affects the value of an option' },
        ]
      },
      {
        name: 'Option Replication Using Put–Call Parity',
        learningObjectives: [
          { id: 'DER-ORPCP-1', reading: 'Option Replication Using Put–Call Parity', text: 'explain put–call parity for European options' },
          { id: 'DER-ORPCP-2', reading: 'Option Replication Using Put–Call Parity', text: 'explain put–call forward parity for European options' },
        ]
      },
      {
        name: 'Valuing a Derivative Using a One-Period Binomial Model',
        learningObjectives: [
          { id: 'DER-VDOPBM-1', reading: 'Valuing a Derivative Using a One-Period Binomial Model', text: 'explain how to value a derivative using a one-period binomial model' },
          { id: 'DER-VDOPBM-2', reading: 'Valuing a Derivative Using a One-Period Binomial Model', text: 'describe the concept of risk neutrality in derivatives pricing' },
        ]
      },
    ]
  },
  {
    topicName: 'Alternative Investments',
    readings: [
      {
        name: 'Alternative Investment Features, Methods, and Structures',
        learningObjectives: [
          { id: 'AI-AIFMS-1', reading: 'Alternative Investment Features, Methods, and Structures', text: 'describe features and categories of alternative investments' },
          { id: 'AI-AIFMS-2', reading: 'Alternative Investment Features, Methods, and Structures', text: 'compare direct investment, co-investment, and fund investment methods for alternative investments' },
          { id: 'AI-AIFMS-3', reading: 'Alternative Investment Features, Methods, and Structures', text: 'describe investment ownership and compensation structures commonly used in alternative investments' },
        ]
      },
      {
        name: 'Alternative Investment Performance and Returns',
        learningObjectives: [
          { id: 'AI-AIPR-1', reading: 'Alternative Investment Performance and Returns', text: 'describe the performance appraisal of alternative investments' },
          { id: 'AI-AIPR-2', reading: 'Alternative Investment Performance and Returns', text: 'calculate and interpret alternative investment returns both before and after fees' },
        ]
      },
      {
        name: 'Investments in Private Capital: Equity and Debt',
        learningObjectives: [
          { id: 'AI-IPCED-1', reading: 'Investments in Private Capital: Equity and Debt', text: 'explain features of private equity and its investment characteristics' },
          { id: 'AI-IPCED-2', reading: 'Investments in Private Capital: Equity and Debt', text: 'explain features of private debt and its investment characteristics' },
          { id: 'AI-IPCED-3', reading: 'Investments in Private Capital: Equity and Debt', text: 'describe the diversification benefits that private capital can provide' },
        ]
      },
      {
        name: 'Real Estate and Infrastructure',
        learningObjectives: [
          { id: 'AI-REI-1', reading: 'Real Estate and Infrastructure', text: 'explain features and characteristics of real estate' },
          { id: 'AI-REI-2', reading: 'Real Estate and Infrastructure', text: 'explain the investment characteristics of real estate investments' },
          { id: 'AI-REI-3', reading: 'Real Estate and Infrastructure', text: 'explain features and characteristics of infrastructure' },
          { id: 'AI-REI-4', reading: 'Real Estate and Infrastructure', text: 'explain the investment characteristics of infrastructure investments' },
        ]
      },
      {
        name: 'Natural Resources',
        learningObjectives: [
          { id: 'AI-NR-1', reading: 'Natural Resources', text: 'explain features of raw land, timberland, and farmland and their investment characteristics' },
          { id: 'AI-NR-2', reading: 'Natural Resources', text: 'describe features of commodities and their investment characteristics' },
          { id: 'AI-NR-3', reading: 'Natural Resources', text: 'analyze sources of risk, return, and diversification among natural resource investments' },
        ]
      },
      {
        name: 'Hedge Funds',
        learningObjectives: [
          { id: 'AI-HF-1', reading: 'Hedge Funds', text: 'explain investment features of hedge funds and contrast them with other asset classes' },
          { id: 'AI-HF-2', reading: 'Hedge Funds', text: 'describe investment forms and vehicles used in hedge fund investments' },
          { id: 'AI-HF-3', reading: 'Hedge Funds', text: 'analyze sources of risk, return, and diversification among hedge fund investments' },
        ]
      },
      {
        name: 'Introduction to Digital Assets',
        learningObjectives: [
          { id: 'AI-IDA-1', reading: 'Introduction to Digital Assets', text: 'describe financial applications of distributed ledger technology' },
          { id: 'AI-IDA-2', reading: 'Introduction to Digital Assets', text: 'explain investment features of digital assets and contrast them with other asset classes' },
          { id: 'AI-IDA-3', reading: 'Introduction to Digital Assets', text: 'describe investment forms and vehicles used in digital asset investments' },
          { id: 'AI-IDA-4', reading: 'Introduction to Digital Assets', text: 'analyze sources of risk, return, and diversification among digital asset investments' },
        ]
      },
    ]
  },
  {
    topicName: 'Portfolio Management',
    readings: [
      {
        name: 'Portfolio Risk and Return: Part I',
        learningObjectives: [
          { id: 'PM-PRR1-1', reading: 'Portfolio Risk and Return: Part I', text: 'describe characteristics of the major asset classes that investors consider in forming portfolios' },
          { id: 'PM-PRR1-2', reading: 'Portfolio Risk and Return: Part I', text: 'explain risk aversion and its implications for portfolio selection' },
          { id: 'PM-PRR1-3', reading: 'Portfolio Risk and Return: Part I', text: 'explain the selection of an optimal portfolio, given an investor\'s utility (or risk aversion) and the capital allocation line' },
          { id: 'PM-PRR1-4', reading: 'Portfolio Risk and Return: Part I', text: 'calculate and interpret the mean, variance, and covariance (or correlation) of asset returns based on historical data' },
          { id: 'PM-PRR1-5', reading: 'Portfolio Risk and Return: Part I', text: 'calculate and interpret portfolio standard deviation' },
          { id: 'PM-PRR1-6', reading: 'Portfolio Risk and Return: Part I', text: "describe the effect on a portfolio's risk of investing in assets that are less than perfectly correlated" },
          { id: 'PM-PRR1-7', reading: 'Portfolio Risk and Return: Part I', text: 'describe and interpret the minimum-variance and efficient frontiers of risky assets and the global minimum-variance portfolio' },
        ]
      },
      {
        name: 'Portfolio Risk and Return: Part II',
        learningObjectives: [
          { id: 'PM-PRR2-1', reading: 'Portfolio Risk and Return: Part II', text: 'describe the implications of combining a risk-free asset with a portfolio of risky assets' },
          { id: 'PM-PRR2-2', reading: 'Portfolio Risk and Return: Part II', text: 'explain the capital allocation line (CAL) and the capital market line (CML)' },
          { id: 'PM-PRR2-3', reading: 'Portfolio Risk and Return: Part II', text: 'explain systematic and nonsystematic risk, including why an investor should not expect to receive additional return for bearing nonsystematic risk' },
          { id: 'PM-PRR2-4', reading: 'Portfolio Risk and Return: Part II', text: 'explain return generating models (including the market model) and their uses' },
          { id: 'PM-PRR2-5', reading: 'Portfolio Risk and Return: Part II', text: 'calculate and interpret beta' },
          { id: 'PM-PRR2-6', reading: 'Portfolio Risk and Return: Part II', text: 'explain the capital asset pricing model (CAPM), including its assumptions, and the security market line (SML)' },
          { id: 'PM-PRR2-7', reading: 'Portfolio Risk and Return: Part II', text: 'calculate and interpret the expected return of an asset using the CAPM' },
          { id: 'PM-PRR2-8', reading: 'Portfolio Risk and Return: Part II', text: 'describe and demonstrate applications of the CAPM and the SML' },
          { id: 'PM-PRR2-9', reading: 'Portfolio Risk and Return: Part II', text: "calculate and interpret the Sharpe ratio, Treynor ratio, M2, and Jensen's alpha" },
        ]
      },
      {
        name: 'Portfolio Management: An Overview',
        learningObjectives: [
          { id: 'PM-PMO-1', reading: 'Portfolio Management: An Overview', text: 'describe the portfolio approach to investing' },
          { id: 'PM-PMO-2', reading: 'Portfolio Management: An Overview', text: 'describe the steps in the portfolio management process' },
          { id: 'PM-PMO-3', reading: 'Portfolio Management: An Overview', text: 'describe types of investors and distinctive characteristics and needs of each' },
          { id: 'PM-PMO-4', reading: 'Portfolio Management: An Overview', text: 'describe defined contribution and defined benefit pension plans' },
          { id: 'PM-PMO-5', reading: 'Portfolio Management: An Overview', text: 'describe aspects of the asset management industry' },
          { id: 'PM-PMO-6', reading: 'Portfolio Management: An Overview', text: 'describe mutual funds and compare them with other pooled investment products' },
        ]
      },
      {
        name: 'Basics of Portfolio Planning and Construction',
        learningObjectives: [
          { id: 'PM-BPPC-1', reading: 'Basics of Portfolio Planning and Construction', text: 'describe the reasons for a written investment policy statement (IPS)' },
          { id: 'PM-BPPC-2', reading: 'Basics of Portfolio Planning and Construction', text: 'describe the major components of an IPS' },
          { id: 'PM-BPPC-3', reading: 'Basics of Portfolio Planning and Construction', text: 'describe risk and return objectives and how they may be developed for a client' },
          { id: 'PM-BPPC-4', reading: 'Basics of Portfolio Planning and Construction', text: "explain the difference between the willingness and the ability (capacity) to take risk in analyzing an investor's financial risk tolerance" },
          { id: 'PM-BPPC-5', reading: 'Basics of Portfolio Planning and Construction', text: 'describe the investment constraints of liquidity, time horizon, tax concerns, legal and regulatory factors, and unique circumstances and their implications for the choice of portfolio assets' },
          { id: 'PM-BPPC-6', reading: 'Basics of Portfolio Planning and Construction', text: 'explain the specification of asset classes in relation to asset allocation' },
          { id: 'PM-BPPC-7', reading: 'Basics of Portfolio Planning and Construction', text: 'describe the principles of portfolio construction and the role of asset allocation in relation to the IPS' },
          { id: 'PM-BPPC-8', reading: 'Basics of Portfolio Planning and Construction', text: 'describe how environmental, social, and governance (ESG) considerations may be integrated into portfolio planning and construction' },
        ]
      },
      {
        name: 'The Behavioral Biases of Individuals',
        learningObjectives: [
          { id: 'PM-BBI-1', reading: 'The Behavioral Biases of Individuals', text: 'compare and contrast cognitive errors and emotional biases' },
          { id: 'PM-BBI-2', reading: 'The Behavioral Biases of Individuals', text: 'discuss commonly recognized behavioral biases and their implications for financial decision making' },
          { id: 'PM-BBI-3', reading: 'The Behavioral Biases of Individuals', text: 'describe how behavioral biases of investors can lead to market characteristics that may not be explained by traditional finance' },
        ]
      },
      {
        name: 'Introduction to Risk Management',
        learningObjectives: [
          { id: 'PM-IRM-1', reading: 'Introduction to Risk Management', text: 'define risk management' },
          { id: 'PM-IRM-2', reading: 'Introduction to Risk Management', text: 'describe features of a risk management framework' },
          { id: 'PM-IRM-3', reading: 'Introduction to Risk Management', text: 'define risk governance and describe elements of effective risk governance' },
          { id: 'PM-IRM-4', reading: 'Introduction to Risk Management', text: 'explain how risk tolerance affects risk management' },
          { id: 'PM-IRM-5', reading: 'Introduction to Risk Management', text: 'describe risk budgeting and its role in risk governance' },
          { id: 'PM-IRM-6', reading: 'Introduction to Risk Management', text: 'identify financial and non-financial sources of risk and describe how they may interact' },
          { id: 'PM-IRM-7', reading: 'Introduction to Risk Management', text: 'describe methods for measuring and modifying risk exposures and factors to consider in choosing among the methods' },
        ]
      },
    ]
  },
  {
    topicName: 'Ethical and Professional Standards',
    readings: [
      {
        name: 'Ethics and Trust in the Investment Profession',
        learningObjectives: [
          { id: 'EPS-ETIP-1', reading: 'Ethics and Trust in the Investment Profession', text: 'explain ethics' },
          { id: 'EPS-ETIP-2', reading: 'Ethics and Trust in the Investment Profession', text: 'describe the role of a code of ethics in defining a profession' },
          { id: 'EPS-ETIP-3', reading: 'Ethics and Trust in the Investment Profession', text: 'describe professions and how they establish trust' },
          { id: 'EPS-ETIP-4', reading: 'Ethics and Trust in the Investment Profession', text: 'describe the need for high ethical standards in investment management' },
          { id: 'EPS-ETIP-5', reading: 'Ethics and Trust in the Investment Profession', text: 'explain professionalism in investment management' },
          { id: 'EPS-ETIP-6', reading: 'Ethics and Trust in the Investment Profession', text: 'identify challenges to ethical behavior' },
          { id: 'EPS-ETIP-7', reading: 'Ethics and Trust in the Investment Profession', text: 'compare and contrast ethical standards with legal standards' },
          { id: 'EPS-ETIP-8', reading: 'Ethics and Trust in the Investment Profession', text: 'describe a framework for ethical decision making' },
        ]
      },
      {
        name: 'Code of Ethics and Standards of Professional Conduct',
        learningObjectives: [
          { id: 'EPS-CESPC-1', reading: 'Code of Ethics and Standards of Professional Conduct', text: 'describe the structure of the CFA Institute Professional Conduct Program and the process for the enforcement of the Code and Standards' },
          { id: 'EPS-CESPC-2', reading: 'Code of Ethics and Standards of Professional Conduct', text: 'identify the six components of the Code of Ethics and the seven Standards of Professional Conduct' },
          { id: 'EPS-CESPC-3', reading: 'Code of Ethics and Standards of Professional Conduct', text: 'explain the ethical responsibilities required by the Code and Standards, including the sub-sections of each Standard' },
        ]
      },
      {
        name: 'Guidance for Standards I–VII',
        learningObjectives: [
          { id: 'EPS-GFSVII-1', reading: 'Guidance for Standards I–VII', text: 'demonstrate the application of the Code of Ethics and Standards of Professional Conduct to situations involving issues of professional integrity' },
          { id: 'EPS-GFSVII-2', reading: 'Guidance for Standards I–VII', text: 'recommend practices and procedures designed to prevent violations of the Code of Ethics and Standards of Professional Conduct' },
          { id: 'EPS-GFSVII-3', reading: 'Guidance for Standards I–VII', text: 'identify conduct that conforms to the Code and Standards and conduct that violates the Code and Standards' },
        ]
      },
      {
        name: 'Introduction to the Global Investment Performance Standards (GIPS)',
        learningObjectives: [
          { id: 'EPS-IGIPS-1', reading: 'Introduction to the Global Investment Performance Standards (GIPS)', text: 'explain why the GIPS standards were created, who can claim compliance, and who benefits from compliance' },
          { id: 'EPS-IGIPS-2', reading: 'Introduction to the Global Investment Performance Standards (GIPS)', text: 'describe the key concepts of the GIPS Standards for Firms' },
          { id: 'EPS-IGIPS-3', reading: 'Introduction to the Global Investment Performance Standards (GIPS)', text: 'explain the purpose of composites in performance reporting' },
          { id: 'EPS-IGIPS-4', reading: 'Introduction to the Global Investment Performance Standards (GIPS)', text: "describe the fundamentals of compliance, including the recommendations of the GIPS standards with respect to the definition of the firm and the firm's definition of discretion" },
          { id: 'EPS-IGIPS-5', reading: 'Introduction to the Global Investment Performance Standards (GIPS)', text: 'describe the concept of independent verification' },
        ]
      },
      {
        name: 'Ethics Application',
        learningObjectives: [
          { id: 'EPS-EA-1', reading: 'Ethics Application', text: 'evaluate practices, policies, and conduct relative to the CFA Institute Code of Ethics and Standards of Professional Conduct' },
          { id: 'EPS-EA-2', reading: 'Ethics Application', text: 'explain how the practices, policies, and conduct do or do not violate the CFA Institute Code of Ethics and Standards of Professional Conduct' },
        ]
      },
    ]
  },
];

// Helper function to get all learning objectives for a topic
export function getLearningObjectivesForTopic(topicName: string): LearningObjective[] {
  const topic = CFA_2026_LEARNING_OBJECTIVES.find(t => t.topicName === topicName);
  if (!topic) return [];
  return topic.readings.flatMap(r => r.learningObjectives);
}

// Helper function to get readings for a topic
export function getReadingsForTopic(topicName: string): Reading[] {
  const topic = CFA_2026_LEARNING_OBJECTIVES.find(t => t.topicName === topicName);
  return topic?.readings || [];
}

// Helper function to get a specific learning objective by ID
export function getLearningObjectiveById(id: string): LearningObjective | undefined {
  for (const topic of CFA_2026_LEARNING_OBJECTIVES) {
    for (const reading of topic.readings) {
      const lo = reading.learningObjectives.find(lo => lo.id === id);
      if (lo) return lo;
    }
  }
  return undefined;
}

// Helper function to get topic names
export function getTopicNames(): string[] {
  return CFA_2026_LEARNING_OBJECTIVES.map(t => t.topicName);
}
