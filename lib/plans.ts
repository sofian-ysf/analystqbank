// Subscription plan limits - safe to import on client side
export const PLAN_LIMITS = {
  trial: {
    name: 'Free Trial',
    mockExams: 1,
    questions: 100,
    durationHours: 24,
    price: 0,
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
    durationHours: null, // Monthly recurring
    price: 30,
    features: [
      '5 mock exams per month',
      '2,000 practice questions',
      'Performance analytics',
      'Email support',
    ],
  },
  premium: {
    name: 'Premium',
    mockExams: Infinity,
    questions: Infinity,
    durationHours: null, // Monthly recurring
    price: 50,
    features: [
      'Unlimited mock exams',
      'Full question bank access',
      'Advanced analytics',
      'Direct contact with CFA analysts',
      'Priority email support',
    ],
  },
};

export type PlanType = keyof typeof PLAN_LIMITS;
