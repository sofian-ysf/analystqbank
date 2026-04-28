// Subscription plan limits - safe to import on client side
export const PLAN_LIMITS = {
  '2month': {
    name: '2 Month',
    mockExams: Infinity,
    questions: Infinity,
    durationHours: null,
    price: 25,
    isLifetime: false,
    features: [
      '2,000+ practice questions',
      'Unlimited mock exams',
      'Detailed explanations',
      'Performance analytics',
      'All 10 CFA L1 topics',
    ],
  },
  '6month': {
    name: '6 Month',
    mockExams: Infinity,
    questions: Infinity,
    durationHours: null,
    price: 40,
    isLifetime: false,
    features: [
      '2,000+ practice questions',
      'Unlimited mock exams',
      'Detailed explanations',
      'Performance analytics',
      'All 10 CFA L1 topics',
    ],
  },
  lifetime: {
    name: 'Lifetime',
    mockExams: Infinity,
    questions: Infinity,
    durationHours: null,
    price: 70,
    isLifetime: true,
    features: [
      '2,000+ practice questions',
      'Unlimited mock exams',
      'Detailed explanations',
      'Performance analytics',
      'All 10 CFA L1 topics',
      'Priority email support',
    ],
  },
};

export type PlanType = keyof typeof PLAN_LIMITS;

// Question limits per topic based on CFA Level 1 exam weights
export const QUESTION_LIMITS_BY_TOPIC = {
  '2month': {
    'Ethical and Professional Standards': Infinity,
    'Quantitative Methods': Infinity,
    'Economics': Infinity,
    'Financial Statement Analysis': Infinity,
    'Corporate Issuers': Infinity,
    'Equity Investments': Infinity,
    'Fixed Income': Infinity,
    'Derivatives': Infinity,
    'Alternative Investments': Infinity,
    'Portfolio Management': Infinity,
  },
  '6month': {
    'Ethical and Professional Standards': Infinity,
    'Quantitative Methods': Infinity,
    'Economics': Infinity,
    'Financial Statement Analysis': Infinity,
    'Corporate Issuers': Infinity,
    'Equity Investments': Infinity,
    'Fixed Income': Infinity,
    'Derivatives': Infinity,
    'Alternative Investments': Infinity,
    'Portfolio Management': Infinity,
  },
  lifetime: {
    'Ethical and Professional Standards': Infinity,
    'Quantitative Methods': Infinity,
    'Economics': Infinity,
    'Financial Statement Analysis': Infinity,
    'Corporate Issuers': Infinity,
    'Equity Investments': Infinity,
    'Fixed Income': Infinity,
    'Derivatives': Infinity,
    'Alternative Investments': Infinity,
    'Portfolio Management': Infinity,
  },
};
