import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { PLAN_LIMITS, PlanType } from '@/lib/plans';

export async function GET() {
  console.log('=== GET /api/subscription START ===');
  try {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    console.log('User:', user?.id || 'NONE');

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile with subscription info
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('subscription_plan, subscription_status, trial_ends_at, account_created_at')
      .eq('id', user.id)
      .single();

    console.log('Profile:', JSON.stringify(profile));
    console.log('Profile subscription_plan:', profile?.subscription_plan);
    console.log('Profile subscription_status:', profile?.subscription_status);

    // Get subscription plan and status
    const plan = profile?.subscription_plan as PlanType | null;
    const status = profile?.subscription_status;

    console.log('Parsed plan:', plan, 'Parsed status:', status);

    // Check if user has lifetime status - they should have full access
    if (status === 'lifetime') {
      console.log('User has lifetime status - granting full access');

      const limits = PLAN_LIMITS[plan || 'lifetime'];

      return NextResponse.json({
        plan: plan || 'lifetime',
        status: 'lifetime',
        canAccessMockExams: true,
        canAccessQuestions: true,
        mockExamsUsed: 0,
        questionsAnswered: 0,
        mockExamsRemaining: null,
        questionsRemaining: null,
        limits,
        needsUpgrade: false,
      });
    }

    // Users without a valid paid plan should be blocked
    if (!plan || (plan !== '2month' && plan !== '6month' && plan !== 'lifetime')) {
      console.log('No valid plan - returning no_subscription');
      return NextResponse.json({
        plan: null,
        status: 'no_subscription',
        canAccessMockExams: false,
        canAccessQuestions: false,
        mockExamsUsed: 0,
        questionsAnswered: 0,
        mockExamsRemaining: 0,
        questionsRemaining: 0,
        limits: null,
        needsUpgrade: true,
      });
    }

    // Get usage counts (all-time for lifetime plans)
    const { count: mockExamsUsed } = await supabase
      .from('user_mock_exam_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // For questions, we limit by availability (QUESTION_LIMITS_BY_TOPIC), not by usage
    // So we don't track "questions used" anymore
    const questionsAnswered = 0; // Not tracking usage, limiting by availability instead

    const limits = PLAN_LIMITS[plan];

    console.log('Plan:', plan, 'Status:', status, 'Limits:', JSON.stringify(limits));

    // Calculate remaining
    const mockExamsRemaining = limits.mockExams === Infinity
      ? null
      : Math.max(0, limits.mockExams - (mockExamsUsed || 0));

    // Questions are limited by availability per topic, not by tracking usage
    // So questionsRemaining represents the total available, not consumed
    const questionsRemaining = limits.questions === Infinity
      ? null
      : limits.questions;

    // Check access - valid statuses for paid users
    const hasValidStatus = status === 'active' || status === 'lifetime';
    const isExpired = status === 'expired';

    console.log('hasValidStatus:', hasValidStatus, 'isExpired:', isExpired);

    const canAccessMockExams = !isExpired &&
      hasValidStatus &&
      (mockExamsRemaining === null || mockExamsRemaining > 0);

    // Questions are always accessible for valid paid subscriptions
    const canAccessQuestions = !isExpired && hasValidStatus;

    console.log('canAccessMockExams:', canAccessMockExams, 'canAccessQuestions:', canAccessQuestions);

    // Determine if user needs to upgrade
    const needsUpgrade = isExpired || !canAccessQuestions || !canAccessMockExams;

    return NextResponse.json({
      plan,
      status,
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
