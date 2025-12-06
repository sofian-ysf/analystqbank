import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = createClient();

    // Fetch users from Supabase Auth
    const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error('Error fetching auth users:', authError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Transform auth users to match expected format
    const users = authUsers?.map(user => ({
      id: user.id,
      email: user.email || 'No email',
      full_name: user.user_metadata?.full_name || 'No name',
      exam_level: user.user_metadata?.exam_level || 'CFA Level 1',
      subscription_plan: user.user_metadata?.subscription_plan || 'free',
      created_at: user.created_at
    })) || [];

    // Keep the error variable for later use but silence the unused variable warning
    const error = authError;

    const totalUsers = users?.length || 0;

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const newUsersThisWeek = users?.filter(user =>
      new Date(user.created_at) >= weekAgo
    ).length || 0;

    const newUsersThisMonth = users?.filter(user =>
      new Date(user.created_at) >= monthAgo
    ).length || 0;

    const subscriptionStats = users?.reduce((acc, user) => {
      acc[user.subscription_plan] = (acc[user.subscription_plan] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    const examLevelStats = users?.reduce((acc, user) => {
      acc[user.exam_level] = (acc[user.exam_level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    return NextResponse.json({
      users,
      stats: {
        totalUsers,
        newUsersThisWeek,
        newUsersThisMonth,
        subscriptionStats,
        examLevelStats
      }
    });
  } catch (error) {
    console.error('Error in admin users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}