export interface DemoQuestion {
  id: string
  category: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question_text: string
  options: { letter: string; text: string }[]
  correct_answer: string
  explanation: {
    summary: string
    key_points: string[]
    formula?: string
    why_wrong: Record<string, string>
    exam_tip: string
    calculation_steps?: string[]
  }
}

export const demoQuestions: DemoQuestion[] = [
  // ========== ETHICS (3) ==========
  {
    id: 'eth-1',
    category: 'Standard I(A)',
    topic: 'Ethics',
    difficulty: 'Medium',
    question_text: 'A portfolio manager discovers that a colleague has been front-running client trades. According to the CFA Institute Code of Ethics, the portfolio manager should most appropriately:',
    options: [
      { letter: 'A', text: 'Ignore the situation to avoid workplace conflict' },
      { letter: 'B', text: 'Report the violation to their supervisor or compliance department' },
      { letter: 'C', text: 'Confront the colleague privately and ask them to stop' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Members must report violations they reasonably believe have occurred to the appropriate supervisory or compliance personnel. Front-running harms clients and violates market integrity.',
      key_points: [
        'Standard I(A) - Knowledge of the Law requires members to not knowingly participate in violations',
        'Members should dissociate from any ongoing violation',
        'Reporting to compliance is the appropriate first step',
        'Private confrontation does not fulfill the member\'s ethical obligations'
      ],
      why_wrong: {
        'A': 'Ignoring violations makes the member complicit and violates Standard I(A). Members have an obligation to act.',
        'C': 'While confrontation might stop the behaviour, it does not fulfill the obligation to report to compliance and may allow harm to continue.'
      },
      exam_tip: 'When in doubt about ethics questions, the answer usually involves taking action through proper channels (compliance/supervisor) rather than ignoring or handling personally.'
    }
  },
  {
    id: 'eth-2',
    category: 'Standard III(B)',
    topic: 'Ethics',
    difficulty: 'Easy',
    question_text: 'An analyst writes a research report recommending a stock. The analyst owns shares in the company. According to Standard VI(A) Disclosure of Conflicts, the analyst must:',
    options: [
      { letter: 'A', text: 'Sell the shares before publishing the report' },
      { letter: 'B', text: 'Disclose the ownership in the research report' },
      { letter: 'C', text: 'Refrain from writing reports on companies they own' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Standard VI(A) requires disclosure of conflicts of interest, not prohibition of ownership. The analyst must disclose ownership to allow readers to evaluate potential bias.',
      key_points: [
        'Disclosure allows clients to assess potential bias',
        'Ownership does not automatically create a conflict requiring divestment',
        'The disclosure should be prominent and clear',
        'Firms should have policies on personal trading and disclosure'
      ],
      why_wrong: {
        'A': 'Selling shares is not required - disclosure is sufficient. Forced selling could actually harm the analyst.',
        'C': 'Complete prohibition is too restrictive. The standards require disclosure, not abstention from coverage.'
      },
      exam_tip: 'Remember: Disclosure is the key remedy for conflicts of interest in most ethics scenarios. Look for answers involving transparency.'
    }
  },
  {
    id: 'eth-3',
    category: 'Standard V(A)',
    topic: 'Ethics',
    difficulty: 'Medium',
    question_text: 'A research analyst at a large investment bank receives material nonpublic information about an upcoming merger from a company insider. The analyst should most appropriately:',
    options: [
      { letter: 'A', text: 'Use the information to update their financial models but not trade' },
      { letter: 'B', text: 'Refrain from trading or causing others to trade on the information' },
      { letter: 'C', text: 'Share the information with the firm\'s compliance department for guidance on how to use it' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Standard II(A) prohibits acting or causing others to act on material nonpublic information. The analyst must not trade, recommend, or share the information.',
      key_points: [
        'Material nonpublic information (MNPI) cannot be used for trading decisions',
        'Using MNPI to update models that inform recommendations is also prohibited',
        'The information should not be shared, even internally',
        'The analyst should maintain the information barrier'
      ],
      why_wrong: {
        'A': 'Using MNPI to update models that affect recommendations is still acting on the information - prohibited.',
        'C': 'Sharing MNPI with compliance for "guidance on how to use it" suggests intent to use it, which violates the standard.'
      },
      exam_tip: 'With MNPI questions, the correct answer is almost always complete abstention - no trading, no sharing, no using in any way.'
    }
  },

  // ========== QUANTITATIVE METHODS (3) ==========
  {
    id: 'quant-1',
    category: 'Time Value of Money',
    topic: 'Quantitative Methods',
    difficulty: 'Medium',
    question_text: 'An investor deposits £10,000 in an account earning 6% annual interest, compounded monthly. What is the value of the account after 3 years?',
    options: [
      { letter: 'A', text: '£11,910' },
      { letter: 'B', text: '£11,967' },
      { letter: 'C', text: '£11,800' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Using the compound interest formula with monthly compounding: FV = PV × (1 + r/n)^(n×t) = £10,000 × (1 + 0.06/12)^(12×3) = £11,966.81 ≈ £11,967',
      key_points: [
        'Monthly compounding means n = 12 periods per year',
        'The periodic rate is 6%/12 = 0.5% per month',
        'Total periods = 12 months × 3 years = 36 periods',
        'More frequent compounding results in higher future value'
      ],
      formula: 'FV = PV × (1 + r/n)^(n×t)',
      why_wrong: {
        'A': '£11,910 uses simple interest or an incorrect compounding calculation.',
        'C': '£11,800 significantly underestimates the compound growth - likely uses simple interest (£10,000 × 1.18).'
      },
      exam_tip: 'Always check if the question specifies compounding frequency. Annual vs monthly compounding will give different answers.',
      calculation_steps: [
        'Step 1: Identify the variables',
        'PV = £10,000, r = 6% = 0.06, n = 12 (monthly), t = 3 years',
        'Step 2: Calculate periodic rate',
        'Periodic rate = 0.06 / 12 = 0.005 (0.5%)',
        'Step 3: Calculate total periods',
        'Total periods = 12 × 3 = 36',
        'Step 4: Apply the formula',
        'FV = £10,000 × (1.005)^36',
        'FV = £10,000 × 1.19668 = £11,966.81'
      ]
    }
  },
  {
    id: 'quant-2',
    category: 'Statistics',
    topic: 'Quantitative Methods',
    difficulty: 'Easy',
    question_text: 'A portfolio has annual returns of 8%, 12%, -4%, 15%, and 9% over five years. The arithmetic mean return is closest to:',
    options: [
      { letter: 'A', text: '7.8%' },
      { letter: 'B', text: '8.0%' },
      { letter: 'C', text: '10.0%' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'The arithmetic mean is the sum of returns divided by the number of observations: (8 + 12 + (-4) + 15 + 9) / 5 = 40 / 5 = 8.0%',
      key_points: [
        'Arithmetic mean = Sum of values / Number of observations',
        'Include negative returns in the calculation',
        'Arithmetic mean is appropriate for single-period expected returns',
        'Geometric mean would be used for multi-period compound returns'
      ],
      formula: 'Arithmetic Mean = Σx / n',
      why_wrong: {
        'A': '7.8% is the geometric mean, not the arithmetic mean.',
        'C': '10.0% appears to exclude the negative return from the calculation.'
      },
      exam_tip: 'The CFA exam often tests whether you know the difference between arithmetic and geometric means. Arithmetic = simple average, Geometric = compound growth rate.',
      calculation_steps: [
        'Step 1: Sum all returns',
        '8% + 12% + (-4%) + 15% + 9% = 40%',
        'Step 2: Divide by number of observations',
        '40% / 5 = 8.0%'
      ]
    }
  },
  {
    id: 'quant-3',
    category: 'Probability',
    topic: 'Quantitative Methods',
    difficulty: 'Hard',
    question_text: 'The probability that a stock will increase in value is 0.6. If two stocks are independent, what is the probability that both stocks increase in value?',
    options: [
      { letter: 'A', text: '0.36' },
      { letter: 'B', text: '0.60' },
      { letter: 'C', text: '1.20' },
    ],
    correct_answer: 'A',
    explanation: {
      summary: 'For independent events, P(A and B) = P(A) × P(B) = 0.6 × 0.6 = 0.36',
      key_points: [
        'Independence means the outcome of one event does not affect the other',
        'Multiplication rule applies for joint probability of independent events',
        'This is different from mutually exclusive events (which cannot occur together)',
        'Joint probabilities are always ≤ individual probabilities'
      ],
      formula: 'P(A ∩ B) = P(A) × P(B) for independent events',
      why_wrong: {
        'B': '0.60 is just the probability of one stock increasing - not the joint probability.',
        'C': '1.20 is impossible as probabilities cannot exceed 1.0. This error comes from adding instead of multiplying.'
      },
      exam_tip: 'Remember: Independent events multiply, mutually exclusive events add. And probabilities can never exceed 1.0.'
    }
  },

  // ========== ECONOMICS (2) ==========
  {
    id: 'econ-1',
    category: 'Monetary Policy',
    topic: 'Economics',
    difficulty: 'Easy',
    question_text: 'When a central bank wants to stimulate economic growth, it will most likely:',
    options: [
      { letter: 'A', text: 'Increase the policy interest rate' },
      { letter: 'B', text: 'Decrease the policy interest rate' },
      { letter: 'C', text: 'Increase reserve requirements for banks' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Lowering interest rates is expansionary monetary policy. It reduces borrowing costs, encourages spending and investment, and stimulates economic growth.',
      key_points: [
        'Lower rates reduce cost of borrowing for businesses and consumers',
        'Cheaper credit encourages investment and consumption',
        'This is expansionary (accommodative) monetary policy',
        'The opposite (raising rates) is contractionary policy to slow inflation'
      ],
      why_wrong: {
        'A': 'Increasing rates is contractionary policy - it slows the economy by making borrowing more expensive.',
        'C': 'Higher reserve requirements reduce lending capacity of banks, which is contractionary.'
      },
      exam_tip: 'Think of interest rates as the "price of money". Lower price = more demand = more economic activity.'
    }
  },
  {
    id: 'econ-2',
    category: 'Currency Exchange',
    topic: 'Economics',
    difficulty: 'Medium',
    question_text: 'If the EUR/USD exchange rate moves from 1.10 to 1.15, this means:',
    options: [
      { letter: 'A', text: 'The euro has depreciated against the dollar' },
      { letter: 'B', text: 'The euro has appreciated against the dollar' },
      { letter: 'C', text: 'The dollar has appreciated against the euro' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'EUR/USD = 1.15 means 1 euro buys $1.15. Previously it bought $1.10. Since the euro now buys more dollars, the euro has appreciated.',
      key_points: [
        'EUR/USD is quoted as dollars per euro',
        'A higher number means more dollars per euro = stronger euro',
        'The base currency (EUR) has appreciated',
        'Equivalently, the quote currency (USD) has depreciated'
      ],
      why_wrong: {
        'A': 'The euro has appreciated, not depreciated. It now buys MORE dollars than before.',
        'C': 'The dollar has depreciated (weakened) because you now need more dollars to buy one euro.'
      },
      exam_tip: 'In any quote X/Y, if the number increases, X has strengthened and Y has weakened. X is the base currency.'
    }
  },

  // ========== FINANCIAL REPORTING (2) ==========
  {
    id: 'fra-1',
    category: 'Financial Ratios',
    topic: 'Financial Reporting',
    difficulty: 'Medium',
    question_text: 'A company has a current ratio of 2.5 and a quick ratio of 1.2. This most likely indicates:',
    options: [
      { letter: 'A', text: 'The company has low levels of inventory' },
      { letter: 'B', text: 'The company has significant inventory relative to other current assets' },
      { letter: 'C', text: 'The company has high levels of accounts receivable' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'The large gap between current ratio (2.5) and quick ratio (1.2) indicates that inventory is a significant portion of current assets, since quick ratio excludes inventory.',
      key_points: [
        'Current ratio = Current Assets / Current Liabilities',
        'Quick ratio = (Current Assets - Inventory) / Current Liabilities',
        'The difference between these ratios reflects the inventory level',
        'A large gap suggests inventory is a major component of current assets'
      ],
      formula: 'Quick Ratio = (Cash + Receivables + Marketable Securities) / Current Liabilities',
      why_wrong: {
        'A': 'Low inventory would result in current and quick ratios being closer together.',
        'C': 'Accounts receivable is included in both ratios, so it doesn\'t explain the gap.'
      },
      exam_tip: 'The quick ratio is also called the "acid-test ratio". The key difference from current ratio is the exclusion of inventory.'
    }
  },
  {
    id: 'fra-2',
    category: 'Depreciation',
    topic: 'Financial Reporting',
    difficulty: 'Medium',
    question_text: 'Compared to straight-line depreciation, using accelerated depreciation in early years will result in:',
    options: [
      { letter: 'A', text: 'Higher net income and higher taxes' },
      { letter: 'B', text: 'Lower net income and lower taxes' },
      { letter: 'C', text: 'Higher assets and lower equity' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Accelerated depreciation recognises higher depreciation expense in early years, reducing taxable income and thus taxes. Net income is lower in early years but higher in later years.',
      key_points: [
        'Higher depreciation expense = lower pre-tax income',
        'Lower pre-tax income = lower tax expense (tax shield)',
        'Total depreciation over asset life is the same under both methods',
        'This is a timing difference, not a permanent difference'
      ],
      why_wrong: {
        'A': 'This describes the opposite - straight-line depreciation in early years.',
        'C': 'Assets would be lower (higher accumulated depreciation) and equity would also be lower (lower retained earnings) - both move in the same direction.'
      },
      exam_tip: 'Remember: Accelerated depreciation = Front-loaded expenses = Lower early income = Tax deferral benefit.'
    }
  },

  // ========== FIXED INCOME (2) ==========
  {
    id: 'fi-1',
    category: 'Bond Pricing',
    topic: 'Fixed Income',
    difficulty: 'Easy',
    question_text: 'If market interest rates increase, the price of a fixed-rate bond will most likely:',
    options: [
      { letter: 'A', text: 'Increase' },
      { letter: 'B', text: 'Decrease' },
      { letter: 'C', text: 'Remain unchanged' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Bond prices and interest rates have an inverse relationship. When rates rise, the present value of future cash flows decreases, lowering bond prices.',
      key_points: [
        'Fixed coupon payments become less attractive when market rates rise',
        'Investors demand a discount to buy bonds with below-market coupons',
        'This is the fundamental inverse relationship of bond investing',
        'Duration measures the sensitivity of price to rate changes'
      ],
      why_wrong: {
        'A': 'Bond prices move inversely to interest rates, not in the same direction.',
        'C': 'Bond prices are highly sensitive to interest rate changes - they do not remain unchanged.'
      },
      exam_tip: 'This inverse relationship is fundamental to fixed income. Higher rates = lower bond prices, and vice versa.'
    }
  },
  {
    id: 'fi-2',
    category: 'Duration',
    topic: 'Fixed Income',
    difficulty: 'Medium',
    question_text: 'A bond has a modified duration of 5.5 years. If yields increase by 50 basis points, the bond price will approximately:',
    options: [
      { letter: 'A', text: 'Increase by 2.75%' },
      { letter: 'B', text: 'Decrease by 2.75%' },
      { letter: 'C', text: 'Decrease by 5.50%' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Price change ≈ -Duration × Yield change = -5.5 × 0.50% = -2.75%. The negative sign indicates price decreases when yields increase.',
      key_points: [
        'Modified duration measures price sensitivity to yield changes',
        'The formula is: %ΔPrice ≈ -Duration × ΔYield',
        '50 basis points = 0.50%',
        'The negative sign reflects the inverse price/yield relationship'
      ],
      formula: '%ΔPrice ≈ -Modified Duration × ΔYield',
      why_wrong: {
        'A': 'Prices decrease (not increase) when yields rise. The relationship is inverse.',
        'C': '5.50% would be the result if yields increased by 100 basis points (1%), not 50 basis points.'
      },
      exam_tip: 'Remember: Duration × Yield change = Price change. Don\'t forget the negative sign (inverse relationship)!',
      calculation_steps: [
        'Step 1: Convert basis points to percentage',
        '50 basis points = 0.50% = 0.0050',
        'Step 2: Apply the duration formula',
        '%ΔPrice ≈ -5.5 × 0.50%',
        '%ΔPrice ≈ -2.75%',
        'The bond price decreases by approximately 2.75%'
      ]
    }
  },

  // ========== EQUITY (2) ==========
  {
    id: 'eq-1',
    category: 'Valuation',
    topic: 'Equity',
    difficulty: 'Medium',
    question_text: 'A company pays a dividend of £2.00 per share, which is expected to grow at 5% annually. If the required return is 12%, the intrinsic value using the Gordon Growth Model is closest to:',
    options: [
      { letter: 'A', text: '£28.57' },
      { letter: 'B', text: '£30.00' },
      { letter: 'C', text: '£16.67' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Gordon Growth Model: V = D₁ / (r - g) = (£2.00 × 1.05) / (0.12 - 0.05) = £2.10 / 0.07 = £30.00',
      key_points: [
        'D₁ is the next expected dividend, not the current dividend',
        'D₁ = D₀ × (1 + g) = £2.00 × 1.05 = £2.10',
        'The model assumes constant growth forever',
        'Required return must exceed growth rate (r > g)'
      ],
      formula: 'V₀ = D₁ / (r - g) where D₁ = D₀ × (1 + g)',
      why_wrong: {
        'A': '£28.57 uses the current dividend (£2.00) instead of the next expected dividend (£2.10).',
        'C': '£16.67 appears to use the dividend without the growth adjustment and possibly an incorrect denominator.'
      },
      exam_tip: 'The most common GGM error is using D₀ instead of D₁. Always grow the dividend by one period first!',
      calculation_steps: [
        'Step 1: Calculate next year\'s dividend (D₁)',
        'D₁ = D₀ × (1 + g) = £2.00 × 1.05 = £2.10',
        'Step 2: Apply Gordon Growth Model',
        'V₀ = D₁ / (r - g)',
        'V₀ = £2.10 / (0.12 - 0.05)',
        'V₀ = £2.10 / 0.07 = £30.00'
      ]
    }
  },
  {
    id: 'eq-2',
    category: 'Market Efficiency',
    topic: 'Equity',
    difficulty: 'Easy',
    question_text: 'According to the weak form of market efficiency, which of the following strategies would NOT generate abnormal returns?',
    options: [
      { letter: 'A', text: 'Trading based on insider information' },
      { letter: 'B', text: 'Technical analysis using historical prices' },
      { letter: 'C', text: 'Fundamental analysis using public financial statements' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Weak-form efficiency states that prices reflect all historical price and volume data. Therefore, technical analysis (which uses this data) cannot generate abnormal returns.',
      key_points: [
        'Weak form: Historical price/volume data is reflected in prices',
        'Semi-strong form: All public information is reflected',
        'Strong form: All information (including private) is reflected',
        'Technical analysis relies on historical patterns'
      ],
      why_wrong: {
        'A': 'Insider trading uses private information - even strong-form efficiency questions whether this works.',
        'C': 'Fundamental analysis uses public information - this is addressed by semi-strong form efficiency, not weak form.'
      },
      exam_tip: 'Remember the hierarchy: Weak (historical) → Semi-strong (+ public) → Strong (+ private). Each level includes all previous levels.'
    }
  },

  // ========== PORTFOLIO MANAGEMENT (1) ==========
  {
    id: 'pm-1',
    category: 'Diversification',
    topic: 'Portfolio Management',
    difficulty: 'Medium',
    question_text: 'Two assets have a correlation of -0.5. Adding the second asset to a portfolio containing only the first asset will most likely:',
    options: [
      { letter: 'A', text: 'Increase portfolio risk' },
      { letter: 'B', text: 'Decrease portfolio risk' },
      { letter: 'C', text: 'Have no effect on portfolio risk' },
    ],
    correct_answer: 'B',
    explanation: {
      summary: 'Negative correlation means assets tend to move in opposite directions. This provides diversification benefits, reducing overall portfolio risk below the weighted average of individual risks.',
      key_points: [
        'Correlation ranges from -1 to +1',
        'Negative correlation provides the strongest diversification benefit',
        'Portfolio risk depends on individual risks, weights, and correlations',
        'Diversification benefit increases as correlation decreases'
      ],
      formula: 'σ²p = w₁²σ₁² + w₂²σ₂² + 2w₁w₂σ₁σ₂ρ₁₂',
      why_wrong: {
        'A': 'Negative correlation reduces risk through diversification, not increases it.',
        'C': 'Correlation significantly affects portfolio risk - only perfectly positive correlation (+1) results in no diversification benefit.'
      },
      exam_tip: 'Lower correlation = greater diversification benefit. The correlation term in the portfolio variance formula can be negative, reducing total risk.'
    }
  },
]
