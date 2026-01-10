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
    price: 250,
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
    price: 300,
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
