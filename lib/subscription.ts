import { createClient } from '@/lib/supabase';
import { PLAN_LIMITS, PlanType } from '@/lib/stripe';

export interface SubscriptionInfo {
  plan: PlanType;
  status: string;
  trialEndsAt: Date | null;
  isTrialExpired: boolean;
  canAccessMockExams: boolean;
  canAccessQuestions: boolean;
  mockExamsRemaining: number | null; // null = unlimited
  questionsRemaining: number | null; // null = unlimited
  limits: typeof PLAN_LIMITS[PlanType];
}

export async function getSubscriptionInfo(userId: string): Promise<SubscriptionInfo | null> {
  const supabase = createClient();

  // Get user profile with subscription info
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('subscription_plan, subscription_status, trial_ends_at')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    return null;
  }

  const plan = (profile.subscription_plan || 'trial') as PlanType;
  const status = profile.subscription_status || 'trialing';
  const trialEndsAt = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null;
  const now = new Date();

  // Check if trial is expired
  const isTrialExpired = plan === 'trial' && trialEndsAt !== null && now > trialEndsAt;

  // Get usage counts for the current period
  const { mockExamsUsed, questionsAnswered } = await getUsageCounts(userId, supabase);

  const limits = PLAN_LIMITS[plan];

  // Calculate remaining
  const mockExamsRemaining = limits.mockExams === Infinity
    ? null
    : Math.max(0, limits.mockExams - mockExamsUsed);

  const questionsRemaining = limits.questions === Infinity
    ? null
    : Math.max(0, limits.questions - questionsAnswered);

  // Check access
  const canAccessMockExams = !isTrialExpired &&
    (status === 'active' || status === 'trialing') &&
    (mockExamsRemaining === null || mockExamsRemaining > 0);

  const canAccessQuestions = !isTrialExpired &&
    (status === 'active' || status === 'trialing') &&
    (questionsRemaining === null || questionsRemaining > 0);

  return {
    plan,
    status,
    trialEndsAt,
    isTrialExpired,
    canAccessMockExams,
    canAccessQuestions,
    mockExamsRemaining,
    questionsRemaining,
    limits,
  };
}

async function getUsageCounts(userId: string, supabase: ReturnType<typeof createClient>) {
  // Get mock exams taken this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: mockExamsUsed } = await supabase
    .from('mock_exams')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', startOfMonth.toISOString());

  // Get questions answered (all time for trial, this month for subscriptions)
  const { count: questionsAnswered } = await supabase
    .from('user_question_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return {
    mockExamsUsed: mockExamsUsed || 0,
    questionsAnswered: questionsAnswered || 0,
  };
}

export function formatTimeRemaining(trialEndsAt: Date): string {
  const now = new Date();
  const diff = trialEndsAt.getTime() - now.getTime();

  if (diff <= 0) {
    return 'Expired';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  return `${minutes}m remaining`;
}

export function getPlanUpgradeMessage(plan: PlanType, feature: 'mockExams' | 'questions'): string {
  if (plan === 'trial') {
    if (feature === 'mockExams') {
      return 'Upgrade to Basic for 5 mock exams/month or Premium for unlimited access.';
    }
    return 'Upgrade to Basic for 2,000 questions or Premium for full access.';
  }

  if (plan === 'basic') {
    if (feature === 'mockExams') {
      return 'Upgrade to Premium for unlimited mock exams.';
    }
    return 'Upgrade to Premium for full question bank access.';
  }

  return '';
}
