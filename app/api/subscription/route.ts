import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile with subscription info
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('subscription_plan, subscription_status, trial_ends_at, account_created_at')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      // Return default trial info if no profile exists
      return NextResponse.json({
        plan: 'trial',
        status: 'trialing',
        trialEndsAt: null,
        isTrialExpired: true,
        canAccessMockExams: false,
        canAccessQuestions: false,
        mockExamsUsed: 0,
        questionsAnswered: 0,
        mockExamsRemaining: 0,
        questionsRemaining: 0,
        limits: PLAN_LIMITS.trial,
        needsUpgrade: true,
      });
    }

    // Map 'free' to 'trial' (database uses 'free', code uses 'trial')
    const dbPlan = profile.subscription_plan || 'free';
    const plan = (dbPlan === 'free' ? 'trial' : dbPlan) as PlanType;
    const status = profile.subscription_status || 'trialing';
    const trialEndsAt = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null;
    const now = new Date();

    // Check if trial is expired
    // IMPORTANT: If trial_ends_at is NULL for a trial user, treat as expired (safety measure)
    const isTrialExpired = plan === 'trial' && (trialEndsAt === null || now > trialEndsAt);

    // Get usage counts (all-time for lifetime plans)
    const { count: mockExamsUsed } = await supabase
      .from('user_mock_exam_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // For questions, we limit by availability (QUESTION_LIMITS_BY_TOPIC), not by usage
    // So we don't track "questions used" anymore
    const questionsAnswered = 0; // Not tracking usage, limiting by availability instead

    const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.trial;

    // Calculate remaining
    const mockExamsRemaining = limits.mockExams === Infinity
      ? null
      : Math.max(0, limits.mockExams - (mockExamsUsed || 0));

    // Questions are limited by availability per topic, not by tracking usage
    // So questionsRemaining represents the total available, not consumed
    const questionsRemaining = limits.questions === Infinity
      ? null
      : limits.questions;

    // Check access - 'lifetime' status is for paid users
    const hasValidStatus = status === 'active' || status === 'trialing' || status === 'lifetime';

    const canAccessMockExams = !isTrialExpired &&
      hasValidStatus &&
      (mockExamsRemaining === null || mockExamsRemaining > 0);

    // Questions are always accessible (limited by availability per plan, not by usage tracking)
    const canAccessQuestions = !isTrialExpired && hasValidStatus;

    // Determine if user needs to upgrade
    const needsUpgrade = isTrialExpired || !canAccessQuestions || !canAccessMockExams;

    return NextResponse.json({
      plan,
      status,
      trialEndsAt: trialEndsAt?.toISOString() || null,
      isTrialExpired,
      canAccessMockExams,
      canAccessQuestions,
      mockExamsUsed: mockExamsUsed || 0,
      questionsAnswered: 0, // Not tracking usage, limiting by availability
      mockExamsRemaining,
      questionsRemaining,
      limits,
      needsUpgrade,
    });

  } catch (error) {
    console.error('Error fetching subscription:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}
