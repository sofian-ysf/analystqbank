import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    // Fetch auth user
    const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }

    const authUser = authUsers?.find(u => u.id === id);
    if (!authUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch user profile from user_profiles table
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    // Fetch study streak
    const { data: streak } = await supabase
      .from('study_streaks')
      .select('*')
      .eq('user_id', id)
      .single();

    // Fetch aggregated progress stats
    const { data: progressData } = await supabase
      .from('user_progress')
      .select('topic, total_questions, correct_answers, study_time_minutes, last_studied')
      .eq('user_id', id);

    // Fetch recent study sessions (last 10)
    const { data: sessions } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('user_id', id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Fetch recent question attempts (last 20)
    const { data: attempts } = await supabase
      .from('user_question_attempts')
      .select('question_id, selected_answer, is_correct, time_spent_seconds, attempted_at')
      .eq('user_id', id)
      .order('attempted_at', { ascending: false })
      .limit(20);

    // Fetch mock exam attempts
    const { data: mockExams } = await supabase
      .from('user_mock_exam_attempts')
      .select('*')
      .eq('user_id', id)
      .order('created_at', { ascending: false });

    // Fetch achievements
    const { data: achievements } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', id)
      .order('earned_at', { ascending: false });

    // Calculate summary stats
    const totalQuestions = progressData?.reduce((sum, p) => sum + (p.total_questions || 0), 0) || 0;
    const totalCorrect = progressData?.reduce((sum, p) => sum + (p.correct_answers || 0), 0) || 0;
    const totalStudyTime = progressData?.reduce((sum, p) => sum + (p.study_time_minutes || 0), 0) || 0;
    const accuracyRate = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    // Get unique exam level and subscription from user metadata
    const examLevel = authUser.user_metadata?.exam_level || 'CFA Level 1';
    const subscriptionPlan = authUser.user_metadata?.subscription_plan || 'free';

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email || 'No email',
        full_name: authUser.user_metadata?.full_name || 'No name',
        exam_level: examLevel,
        subscription_plan: subscriptionPlan,
        created_at: authUser.created_at
      },
      profile: profile || null,
      streak: streak || null,
      stats: {
        totalQuestions,
        totalCorrect,
        accuracyRate,
        totalStudyTime
      },
      progressByTopic: progressData || [],
      sessions: sessions || [],
      attempts: attempts || [],
      mockExams: mockExams || [],
      achievements: achievements || []
    });
  } catch (error) {
    console.error('Error in admin user detail API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}