// Subscription plan limits - safe to import on client side
export const PLAN_LIMITS = {
  trial: {
    name: 'Free Trial',
    mockExams: 1,
    questions: 100,
    durationHours: 24,
    price: 0,
    isLifetime: false,
    features: [
      '1 mock exam',
      '100 practice questions',
      '24-hour access',
      'Basic analytics',
    ],
  },
  basic: {
    name: 'Basic',
    mockExams: 5,
    questions: 2000,
    durationHours: null,
    price: 50,
    isLifetime: true,
    features: [
      '5 mock exams',
      '2,000 practice questions',
      'Performance analytics',
      'Lifetime access',
    ],
  },
  premium: {
    name: 'Premium',
    mockExams: Infinity,
    questions: Infinity,
    durationHours: null,
    price: 75,
    isLifetime: true,
    features: [
      'Unlimited mock exams',
      'Full question bank access',
      'Advanced analytics',
      'Direct contact with CFA analysts',
      'Priority email support',
      'Lifetime access',
    ],
  },
};

export type PlanType = keyof typeof PLAN_LIMITS;

// Question limits per topic based on CFA Level 1 exam weights
// Trial users get ~100 questions total, distributed by exam weight
// Basic users get ~2000 questions total, distributed by exam weight
// Premium users get unlimited (all available questions)
export const QUESTION_LIMITS_BY_TOPIC = {
  trial: {
    'Ethical and Professional Standards': 15,    // 15-20% weight
    'Quantitative Methods': 7,                    // 6-9% weight
    'Economics': 7,                                // 6-9% weight
    'Financial Statement Analysis': 12,           // 11-14% weight
    'Corporate Issuers': 7,                        // 6-9% weight
    'Equity Investments': 12,                      // 11-14% weight
    'Fixed Income': 12,                            // 11-14% weight
    'Derivatives': 6,                              // 5-8% weight
    'Alternative Investments': 8,                  // 7-10% weight
    'Portfolio Management': 10,                    // 8-12% weight
  },
  basic: {
    'Ethical and Professional Standards': 320,    // 15-20% weight
    'Quantitative Methods': 140,                  // 6-9% weight
    'Economics': 140,                              // 6-9% weight
    'Financial Statement Analysis': 260,          // 11-14% weight
    'Corporate Issuers': 140,                      // 6-9% weight
    'Equity Investments': 260,                     // 11-14% weight
    'Fixed Income': 260,                           // 11-14% weight
    'Derivatives': 120,                            // 5-8% weight
    'Alternative Investments': 160,                // 7-10% weight
    'Portfolio Management': 200,                   // 8-12% weight
  },
  premium: {
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
